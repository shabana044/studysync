import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import Grid from "../components/Grid";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import ExamCard from "../components/exams/ExamCard";
import ExamForm from "../components/exams/ExamForm";
import type { Exam, NewExam } from "../types/study";
import { loadExams, loadSubjects, saveExams } from "../utils/storage";

function Exams() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [examToDelete, setExamToDelete] = useState<Exam | null>(null);
  const savedExams = loadExams();
  const savedSubjects = loadSubjects();

  const [examList, setExamList] = useState<Exam[]>(savedExams);

  useEffect(() => {
    saveExams(examList);
  }, [examList]);

  const subjectOptions = useMemo(() => savedSubjects.map((subject) => subject.name), [savedSubjects]);

  const filteredExams = [...examList]
    .filter((exam) => {
      const query = search.toLowerCase();
      return (
        exam.subject.toLowerCase().includes(query) ||
        exam.examName.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "subject") {
        return a.subject.localeCompare(b.subject);
      }

      if (sortBy === "date") {
        return a.date.localeCompare(b.date);
      }

      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

  function handleAddExam(newExam: NewExam) {
    if (editingExam) {
      setExamList((previousExams) =>
        previousExams.map((exam) =>
          exam.id === editingExam.id
            ? {
                ...exam,
                ...newExam,
              }
            : exam
        )
      );

      setEditingExam(null);
      return;
    }

    const exam: Exam = {
      id: Date.now().toString(),
      ...newExam,
    };

    setExamList((previousExams) => [exam, ...previousExams]);
  }

  function handleDeleteExam(id: string) {
    const exam = examList.find((item) => item.id === id);

    if (exam) {
      setExamToDelete(exam);
    }
  }

  function confirmDeleteExam() {
    if (!examToDelete) return;

    setExamList((previousExams) =>
      previousExams.filter((exam) => exam.id !== examToDelete.id)
    );

    setExamToDelete(null);
  }

  function handleEditExam(exam: Exam) {
    setEditingExam(exam);
    setShowForm(true);
  }

  return (
    <div>
      <PageHeader
        title="Exams"
        action={
          <Button onClick={() => setShowForm(true)}>Add Exam</Button>
        }
      />

      <ConfirmDialog
        open={examToDelete !== null}
        title="Delete Exam"
        message={`Delete "${examToDelete?.examName}"?`}
        onConfirm={confirmDeleteExam}
        onCancel={() => setExamToDelete(null)}
      />

      <Modal open={showForm}>
        <ExamForm
          onClose={() => {
            setShowForm(false);
            setEditingExam(null);
          }}
          onSubmit={handleAddExam}
          editingExam={editingExam}
          subjects={subjectOptions}
        />
      </Modal>

      {examList.length === 0 ? (
        <EmptyState message="No exams added yet." />
      ) : (
        <>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search exams..."
          />

          <SortSelect
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "date", label: "Sort by Nearest Exam" },
              { value: "subject", label: "Sort by Subject" },
              { value: "name", label: "Sort by Date" },
            ]}
          />

          <Grid>
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onDelete={handleDeleteExam}
                onEdit={handleEditExam}
              />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default Exams;