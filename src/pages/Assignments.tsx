import { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import Grid from "../components/Grid";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import AssignmentCard from "../components/assignments/AssignmentCard";
import AssignmentForm from "../components/assignments/AssignmentForm";
import { assignments as sampleAssignments } from "../data/sampleData";
import type { Assignment, NewAssignment } from "../types/study";
import {
  ASSIGNMENTS_KEY,
  loadAssignments,
  loadSubjects,
  saveAssignments,
} from "../utils/storage";

function Assignments() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [editingAssignment, setEditingAssignment] =
    useState<Assignment | null>(null);
  const [assignmentToDelete, setAssignmentToDelete] =
    useState<Assignment | null>(null);

  const [assignmentList, setAssignmentList] = useState<Assignment[]>(() => {
    const hasSavedAssignments =
      localStorage.getItem(ASSIGNMENTS_KEY) !== null;

    return hasSavedAssignments ? loadAssignments() : sampleAssignments;
  });

  useEffect(() => {
    saveAssignments(assignmentList);
  }, [assignmentList]);

  const subjectOptions = useMemo(() => {
    return loadSubjects().map((subject) => subject.name);
  }, []);

  const filteredAssignments = [...assignmentList]
    .filter((assignment) => {
      const query = search.toLowerCase();

      return (
        assignment.title.toLowerCase().includes(query) ||
        assignment.subject.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityRank = { high: 0, medium: 1, low: 2 };
        return priorityRank[a.priority] - priorityRank[b.priority];
      }

      if (sortBy === "status") {
        const statusRank = { pending: 0, completed: 1 };
        return statusRank[a.status] - statusRank[b.status];
      }

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      return a.dueDate.localeCompare(b.dueDate);
    });

  function handleAddAssignment(newAssignment: NewAssignment) {
    if (editingAssignment) {
      setAssignmentList((previousAssignments) =>
        previousAssignments.map((assignment) =>
          assignment.id === editingAssignment.id
            ? {
                ...assignment,
                ...newAssignment,
              }
            : assignment
        )
      );

      setEditingAssignment(null);
      return;
    }

    const assignment: Assignment = {
      id: Date.now().toString(),
      ...newAssignment,
    };

    setAssignmentList((previousAssignments) => [
      assignment,
      ...previousAssignments,
    ]);
  }

  function handleDeleteAssignment(id: string) {
    const assignment = assignmentList.find((item) => item.id === id);

    if (assignment) {
      setAssignmentToDelete(assignment);
    }
  }

  function confirmDeleteAssignment() {
    if (!assignmentToDelete) return;

    setAssignmentList((previousAssignments) =>
      previousAssignments.filter(
        (assignment) => assignment.id !== assignmentToDelete.id
      )
    );

    setAssignmentToDelete(null);
  }

  function handleEditAssignment(assignment: Assignment) {
    setEditingAssignment(assignment);
    setShowForm(true);
  }

  return (
    <div>
      <PageHeader
        title="Assignments"
        action={
          <Button onClick={() => setShowForm(true)}>
            Add Assignment
          </Button>
        }
      />

      <ConfirmDialog
        open={assignmentToDelete !== null}
        title="Delete Assignment"
        message={`Delete "${assignmentToDelete?.title}"?`}
        onConfirm={confirmDeleteAssignment}
        onCancel={() => setAssignmentToDelete(null)}
      />

      <Modal open={showForm}>
        <AssignmentForm
          onClose={() => {
            setShowForm(false);
            setEditingAssignment(null);
          }}
          onSubmit={handleAddAssignment}
          editingAssignment={editingAssignment}
          subjects={subjectOptions}
        />
      </Modal>

      {assignmentList.length === 0 ? (
        <EmptyState message="No assignments added yet." />
      ) : (
        <>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search assignments..."
          />

          <SortSelect
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: "dueDate", label: "Sort by Due Date" },
              { value: "priority", label: "Sort by Priority" },
              { value: "status", label: "Sort by Status" },
              { value: "name", label: "Sort by Name" },
            ]}
          />

          <Grid>
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onDelete={handleDeleteAssignment}
                onEdit={handleEditAssignment}
              />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}

export default Assignments;