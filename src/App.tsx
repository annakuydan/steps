import { useState } from "react";

// Описание типа для записи
interface StepEntry {
  date: string; // Дата в формате "YYYY-MM-DD"
  distance: number; // Пройденное расстояние
}

function App() {
  // Состояния
  const [date, setDate] = useState<string>(""); // Дата
  const [distance, setDistance] = useState<string>(""); // Километры как строка для ввода
  const [steps, setSteps] = useState<StepEntry[]>([]); // Массив записей

  // Функция для добавления или редактирования записи
  const handleAdd = () => {
    if (!date || !distance) return;

    const existingEntry = steps.find((entry) => entry.date === date);

    if (existingEntry) {
      // Заменяем значение на новое
      setSteps((prevSteps) =>
        prevSteps.map((entry) =>
          entry.date === date
            ? { ...entry, distance: parseFloat(distance) }
            : entry
        )
      );
    } else {
      // Добавляем новую запись
      setSteps((prevSteps) => [
        ...prevSteps,
        { date, distance: parseFloat(distance) },
      ]);
    }

    // Сбрасываем поля ввода
    setDate("");
    setDistance("");
  };

  // Функция для удаления записи
  const handleDelete = (deleteDate: string) => {
    setSteps((prevSteps) =>
      prevSteps.filter((entry) => entry.date !== deleteDate)
    );
  };

  return (
    <div className="app">
      <h1>Учёт тренировок</h1>
      {/* Форма для ввода */}
      <div className="form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Пройдено км"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <button onClick={handleAdd}>OK</button>
      </div>

      {/* Таблица для отображения записей */}
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
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            ) // Сортировка по дате
            .map((entry) => (
              <tr key={entry.date}>
                <td>{entry.date}</td>
                <td>{entry.distance.toFixed(1)}</td>
                <td>
                  <button onClick={() => handleDelete(entry.date)}>✘</button>
                  <button
                    onClick={() => {
                      setDate(entry.date);
                      setDistance(entry.distance.toString());
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

export default App;