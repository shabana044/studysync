import { useEffect, useState } from "react";
import { subjects as sampleSubjects } from "../data/sampleData";
import Button from "../components/Button";
import SubjectForm from "../components/subjects/SubjectForm";
import SubjectCard from "../components/subjects/SubjectCard";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import Grid from "../components/Grid";
import EmptyState from "../components/EmptyState";
import SearchBar from "../components/SearchBar";
import ConfirmDialog from "../components/ConfirmDialog";
import SortSelect from "../components/SortSelect";
import type { Subject, NewSubject } from "../types/study";
import { loadSubjects, saveSubjects } from "../utils/storage";

function Subjects() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);

  const savedSubjects = loadSubjects();

  const [subjectList, setSubjectList] = useState<Subject[]>(
    savedSubjects.length > 0 ? savedSubjects : sampleSubjects
  );

  useEffect(() => {
    saveSubjects(subjectList);
  }, [subjectList]);

  const filteredSubjects = [...subjectList]
    .filter((subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "attendance") {
        const attendanceA = a.attendedClasses / a.totalClasses;
        const attendanceB = b.attendedClasses / b.totalClasses;
        return attendanceB - attendanceA;
      }

      return a.name.localeCompare(b.name);
    });

  function handleAddSubject(newSubject: NewSubject) {
    if (editingSubject) {
      setSubjectList((previousSubjects) =>
        previousSubjects.map((subject) =>
          subject.id === editingSubject.id
            ? {
                ...subject,
                ...newSubject,
              }
            : subject
        )
      );

      setEditingSubject(null);
      return;
    }

    const subject: Subject = {
      id: Date.now().toString(),
      ...newSubject,
    };

    setSubjectList((previousSubjects) => [
      ...previousSubjects,
      subject,
    ]);
  }

  function handleDeleteSubject(id: string) {
    const subject = subjectList.find((s) => s.id === id);

    if (subject) {
      setSubjectToDelete(subject);
    }
  }

  function confirmDeleteSubject() {
    if (!subjectToDelete) return;

    setSubjectList((previousSubjects) =>
      previousSubjects.filter(
        (subject) => subject.id !== subjectToDelete.id
      )
    );

    setSubjectToDelete(null);
  }

  function handleEditSubject(subject: Subject) {
    setEditingSubject(subject);
    setShowForm(true);
  }

  function handleUpdateAttendance(
    id: string,
    type: "attended" | "total"
  ) {
    setSubjectList((previousSubjects) =>
      previousSubjects.map((subject) => {
        if (subject.id !== id) return subject;

        if (type === "attended") {
          return {
            ...subject,
            attendedClasses: subject.attendedClasses + 1,
            totalClasses: subject.totalClasses + 1,
          };
        }

        return {
          ...subject,
          totalClasses: subject.totalClasses + 1,
        };
      })
    );
  }

  return (
    <div>
      <PageHeader
        title="Subjects"
        action={
          <Button onClick={() => setShowForm(true)}>
            Add Subject
          </Button>
        }
      />

      <ConfirmDialog
        open={subjectToDelete !== null}
        title="Delete Subject"
        message={`Delete "${subjectToDelete?.name}"?`}
        onConfirm={confirmDeleteSubject}
        onCancel={() => setSubjectToDelete(null)}
      />

      <Modal open={showForm}>
        <SubjectForm
          onClose={() => {
            setShowForm(false);
            setEditingSubject(null);
          }}
          onAddSubject={handleAddSubject}
          editingSubject={editingSubject}
        />
      </Modal>

      {subjectList.length === 0 ? (
        <EmptyState message="No subjects added yet." />
      ) : (
        <>
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <SortSelect
            value={sortBy}
            onChange={setSortBy}
          />

          <Grid>
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onDelete={handleDeleteSubject}
                onEdit={handleEditSubject}
                onUpdateAttendance={handleUpdateAttendance}
              />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default Subjects;