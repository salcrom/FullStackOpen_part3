import { Part } from "./parts/Part";
import { Result } from "./parts/Result";

export const Content = ({ parts }) => {
    // console.log(parts);

    return (
        <>
            <div>
                {parts.map((part) => (
                    <Part key={part.id} part={part} />
                ))}
            </div>
            <div>
                <Result parts={parts} />
            </div>
        </>
    );
};
