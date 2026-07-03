import { useEffect, useState } from "react";
import { subjects as sampleSubjects } from "../data/sampleData";
import Button from "../components/Button";
import SubjectForm from "../components/subjects/SubjectForm";
import SubjectCard from "../components/subjects/SubjectCard";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import Grid from "../components/Grid";
import EmptyState from "../components/EmptyState";
import type { Subject, NewSubject } from "../types/study";
import { loadSubjects, saveSubjects } from "../utils/storage";

function Subjects() {
  const [showForm, setShowForm] = useState(false);

  const savedSubjects = loadSubjects();

  const [subjectList, setSubjectList] = useState<Subject[]>(
    savedSubjects.length > 0 ? savedSubjects : sampleSubjects
  );

  useEffect(() => {
    saveSubjects(subjectList);
  }, [subjectList]);

  function handleAddSubject(newSubject: NewSubject) {
    const subject: Subject = {
      id: Date.now().toString(),
      ...newSubject,
    };

    setSubjectList((previousSubjects) => [
      ...previousSubjects,
      subject,
    ]);
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

      <Modal open={showForm}>
  <SubjectForm
    onClose={() => setShowForm(false)}
    onAddSubject={handleAddSubject}
  />
</Modal>

      {subjectList.length === 0 ? (
  <EmptyState message="No subjects added yet." />
) : (
  <Grid>
    {subjectList.map((subject) => (
      <SubjectCard
        key={subject.id}
        subject={subject}
      />
    ))}
  </Grid>
)}
    </div>
  );
}

export default Subjects;