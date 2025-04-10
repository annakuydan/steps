import { useState, FormEvent, ChangeEvent } from "react";

// Описание типа для записи
type StepEntry = {
  date: string; // Дата в формате "YYYY-MM-DD"
  distance: number; // Пройденное расстояние
};

export default function TrackerForm() {
  const [steps, setSteps] = useState<StepEntry[]>([]); 
  const [form, setForm] = useState<StepEntry>({
    date: "",
    distance: 0,
  });
  const [status, setStatus] = useState<"write" | "edit">("write");
  const handlerSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const existingEntryIndex = steps.findIndex(
      (entry) => entry.date === form.date
    );
    if (status === "write") {
      if (existingEntryIndex !== -1) {
        setSteps((prevSteps) => {
          const stepsArr = [...prevSteps];
          stepsArr[existingEntryIndex].distance =
            Number(form.distance) +
            Number(stepsArr[existingEntryIndex].distance);
          return stepsArr;
        });
      } else {
        setSteps((prevSteps: StepEntry[]) =>
          [...prevSteps, form].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        );
      }
    } else {
      setSteps((prevSteps) => {
        const stepsArr = [...prevSteps];
        stepsArr[existingEntryIndex] = form;
        return stepsArr.sort((a, b) => new Date(a.date) - new Date(b.date));
      });
      setStatus("write");
    }

    setForm({
      date: "",
      distance: 0,
    });
  };

  const hadlerChangeInputs = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleDelete = (deleteDate: string) => {
    setSteps((prevSteps) =>
      prevSteps.filter((entry) => entry.date !== deleteDate)
    );
  };
//форма
  return (
    <div className="app">
      <h1>Учёт тренировок</h1>
      <form className="form" onSubmit={handlerSubmit}>
        <input
          type="date"
          value={form.date}
          onChange={hadlerChangeInputs}
          name="date"
          required
        />
        <input
          type="number"
          placeholder="Пройдено км"
          value={form.distance}
          onChange={hadlerChangeInputs}
          name="distance"
          required
        />
        <button type="submit">OK</button>
      </form>

      <table className="steps-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {steps
            .map((entry) => (
              <tr key={entry.date}>
                <td>{entry.date}</td>
                <td>{entry.distance}</td>
                <td>
                  <button onClick={() => handleDelete(entry.date)}>✘</button>
                  <button
                    onClick={() => {
                      setForm({ date: entry.date, distance: entry.distance });
                      setStatus("edit");
                    }}
                  >
                    ✎
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}