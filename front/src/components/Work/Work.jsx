import { useState } from "react";
import styles from "./Work.module.css";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const Work = () => {
    const [selectedTag, setSelectedTag] = useState(null);
    const navigate = useNavigate();

    const problems = [
        {
            title: "Я не чувствую своего пола",
            description: "Или проблема сексуальной ориентации. В современной культуре поощряется принадлежность к определенному полу...",
            fullText: "В современной культуре поощряется принадлежность к определенному полу. Исторически биологический пол определяется половыми признаками. На самом деле это гораздо более многомерный процесс. Если у животных можно определить пол по половым признакам,то с человеком сложнее, где следует учитывать структуру хромосом или гормональное строение. Нейробиологи говорят, чем выше филогенетический уровень вида, тем сложнее детерминация половой принадлежности и многограннее ее связь с другими аспектами развития. Более сложный онтогенез увеличивают число вариаций развития в психике, выходящих за рамки дихотомии мужское-женское. Многие, так называемые небинарные люди, имеют психологиеские сложности не только из-за давления общества, но и формирования своей идентичности. Задачей психотерапии является не коррекция его гендерной идентичности или сексуальной ориентации, а поиск и расширение выражения его сексуальности и форм творческой адаптации в окружающей среде."
        },
        {
            title: "Неуверенность в себе",
            description: "Проблемы, связанные с низкой самооценкой и недостатком уверенности...",
            fullText: "Полный текст статьи о неуверенности в себе."
        },
        // Добавьте другие проблемы сюда...
    ];

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const handleReadMore = (tag) => {
        navigate(`/articles/${tag.title.replace(/\s+/g, "-").toLowerCase()}`);
    };

    return (
        <section className={styles.work}>
            <h2 className={styles.title}>С ЧЕМ Я РАБОТАЮ</h2>
            <p className={styles.description}>
                Комплексно применяю современные методики психотерапии и соблюдаю абсолютную конфиденциальность.
            </p>
            <div className={styles.tags}>
                {problems.map((problem, index) => (
                    <span
                        key={index}
                        className={styles.tag}
                        onClick={() => handleTagClick(problem)}
                    >
                        {problem.title}
                    </span>
                ))}
            </div>
            <p className={styles.footer}>а также многие другие проблемы</p>
            <button className={styles.button}>Получить консультацию</button>

            {selectedTag && (
                <Modal onClose={() => setSelectedTag(null)}>
                    <h3>{selectedTag.title}</h3>
                    <p>{selectedTag.description}</p>
                    <button
                        className={styles.readMoreButton}
                        onClick={() => handleReadMore(selectedTag)}
                    >
                        Читать подробнее
                    </button>
                </Modal>
            )}
        </section>
    );
};

export default Work;
