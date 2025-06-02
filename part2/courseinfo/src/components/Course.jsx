const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part.name} exercise={part.exercises} />
            ))}
        </div>
    );
};

const Part = ({ part, exercise }) => {
    return (
        <p>{part} {exercise}</p>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce(
        (sum, current) => sum + current.exercises, 0
    );

    return (
        <p><strong>Total of {total} exercises</strong></p>
    );
};


const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;