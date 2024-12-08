export const Result = ({ parts }) => {
    console.log(parts);

    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    console.log(totalExercises);

    return (
        <p>
            <strong>total of {totalExercises} exercises</strong>
        </p>
    );
};
