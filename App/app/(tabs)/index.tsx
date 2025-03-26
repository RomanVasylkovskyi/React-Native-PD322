import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const questions = [
  {
    question: "Як ви реагуєте на несподівані зміни планів?",
    answers: [
      { text: "Легко адаптуюсь", type: "sanguine" },
      { text: "Хвилююсь і сумніваюсь", type: "melancholic" },
      { text: "Сердитію на порушення порядку", type: "choleric" },
      { text: "Приймаю спокійно", type: "phlegmatic" },
    ],
  },
  {
    question: "Як ви приймаєте важливі рішення?",
    answers: [
      { text: "Швидко та рішуче", type: "choleric" },
      { text: "Аналізую всі можливості", type: "melancholic" },
      { text: "Раджуся з іншими", type: "sanguine" },
      { text: "Дію за заздалегідь визначеним планом", type: "phlegmatic" },
    ],
  },
  {
    question: "Ваша реакція на критику?",
    answers: [
      { text: "Швидко забуваю", type: "sanguine" },
      { text: "Переживаю довго", type: "melancholic" },
      { text: "Захищаю свою позицію", type: "choleric" },
      { text: "Спокійно аналізую", type: "phlegmatic" },
    ],
  },
  {
    question: "Як ви проводите вільний час?",
    answers: [
      { text: "У веселій компанії", type: "sanguine" },
      { text: "За улюбленим хобі", type: "melancholic" },
      { text: "Активний відпочинок", type: "choleric" },
      { text: "Тихий відпочинок вдома", type: "phlegmatic" },
    ],
  },
  {
    question: "Ваші дії у конфліктній ситуації?",
    answers: [
      { text: "Намагаюсь помирити всіх", type: "sanguine" },
      { text: "Уникаю конфлікту", type: "melancholic" },
      { text: "Настоюю на своєму", type: "choleric" },
      { text: "Шукаю компроміс", type: "phlegmatic" },
    ],
  },
  {
    question: "Як ви ставитесь до нових знайомств?",
    answers: [
      { text: "Легко йду на контакт", type: "sanguine" },
      { text: "Вибірково та обережно", type: "melancholic" },
      { text: "Проявляю ініціативу", type: "choleric" },
      { text: "Чекаю ініціативи від інших", type: "phlegmatic" },
    ],
  },
  {
    question: "Ваша робоча продуктивність?",
    answers: [
      { text: "Залежить від настрою", type: "sanguine" },
      { text: "Стабільна і послідовна", type: "phlegmatic" },
      { text: "Максимальна при зацікавленості", type: "melancholic" },
      { text: "Висока постійно", type: "choleric" },
    ],
  },
  {
    question: "Як ви ставитесь до ризику?",
    answers: [
      { text: "Люблю екстрим", type: "choleric" },
      { text: "Обережно, з розрахунком", type: "phlegmatic" },
      { text: "Тільки з гарантією безпеки", type: "melancholic" },
      { text: "Якщо це весело", type: "sanguine" },
    ],
  },
  {
    question: "Ваше ставлення до деталей?",
    answers: [
      { text: "Часто упускаю дрібниці", type: "sanguine" },
      { text: "Дуже уважний до деталей", type: "melancholic" },
      { text: "Концентруюсь на головному", type: "choleric" },
      { text: "Систематизую інформацію", type: "phlegmatic" },
    ],
  },
  {
    question: "Як ви вчитесь новому?",
    answers: [
      { text: "Швидко, але поверхнево", type: "sanguine" },
      { text: "Глибоко і фундаментально", type: "melancholic" },
      { text: "Тільки практичні навички", type: "choleric" },
      { text: "Поетапно і системно", type: "phlegmatic" },
    ],
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    sanguine: 0,
    melancholic: 0,
    choleric: 0,
    phlegmatic: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores({ sanguine: 0, melancholic: 0, choleric: 0, phlegmatic: 0 });
    setShowResult(false);
  };

  const getResult = () => {
    const maxScore = Math.max(...Object.values(scores));
    const resultTypes = Object.keys(scores).filter(key => scores[key] === maxScore);
    return resultTypes.length > 1 ? resultTypes[0] : resultTypes;
  };

  const getTemperamentName = (type) => {
    const names = {
      sanguine: "Сангвінік",
      melancholic: "Меланхолік",
      choleric: "Холерик",
      phlegmatic: "Флегматик",
    };
    return Array.isArray(type) ? type.map(t => names[t]).join(' та ') : names[type];
  };

  if (showResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultText}>
          Ваш тип темпераменту:{"\n"}
          <Text style={styles.highlight}>{getTemperamentName(getResult())}</Text>
        </Text>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.buttonText}>Спробувати ще раз</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${(currentQuestion / questions.length) * 100}%` }
          ]}
        />
      </View>

      <Text style={styles.questionNumber}>
        Питання {currentQuestion + 1} з {questions.length}
      </Text>

      <Text style={styles.questionText}>
        {questions[currentQuestion].question}
      </Text>

      {questions[currentQuestion].answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => handleAnswer(answer.type)}>
          <Text style={styles.buttonText}>{answer.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  questionNumber: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 28,
  },
  answerButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  restartButton: {
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  resultText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 34,
  },
  highlight: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default App;