import { Header } from "./course/Header";
import { Content } from "./course/Content";

const Course = ({ course }) => {
    // console.log(course);
    const { name, parts } = course;
    // console.log({ name, parts });

    return (
        <>
            <Header title={name} />
            <Content parts={parts} />
        </>
    );
};

export default Course;
