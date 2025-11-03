import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import quizQuestions from '../data/quizQuestions';

export const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Shuffle questions and set first 10
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    setShowFeedback(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    const newAnswers = [
      ...answers,
      {
        question: questions[currentQuestion].question,
        selectedAnswer,
        correctAnswer: questions[currentQuestion].correctAnswer,
        isCorrect,
        explanation: questions[currentQuestion].explanation
      }
    ];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Auto-advance after 3 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);

    // Reshuffle questions
    const reshuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(reshuffled.slice(0, 10));
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100;
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🏆 Perfect! You're a climate expert!";
    if (percentage >= 80) return "🌟 Excellent! Great knowledge of climate issues!";
    if (percentage >= 60) return "👍 Good job! Keep learning about climate change!";
    if (percentage >= 40) return "📚 Nice effort! Consider learning more about climate science!";
    return "🌱 Keep learning! Climate education is important!";
  };

  if (questions.length === 0) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading quiz...</span>
          </div>
          <p className="mt-3 text-muted">Loading climate quiz...</p>
        </div>
      </Container>
    );
  }

  if (quizCompleted) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h1 className="display-5 fw-bold text-success mb-4">
            🧩 Quiz Complete!
          </h1>

          <Card className="eco-card border-0 shadow-sm mb-4">
            <Card.Body className="p-5">
              <h2 className="mb-4">{getScoreMessage()}</h2>

              <div className="mb-4">
                <div className="display-4 fw-bold text-success mb-2">
                  {score} / {questions.length}
                </div>
                <div className="lead text-muted">
                  {Math.round((score / questions.length) * 100)}% Correct
                </div>
              </div>

              <div className="mb-4">
                <ProgressBar
                  now={(score / questions.length) * 100}
                  variant="success"
                  style={{ height: '25px' }}
                  className="rounded-pill"
                />
              </div>

              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="success"
                  size="lg"
                  className="btn-eco"
                  onClick={handleRetakeQuiz}
                >
                  🔄 Retake Quiz
                </Button>
                <Button
                  variant="outline-success"
                  size="lg"
                  className="btn-eco"
                  onClick={() => window.history.back()}
                >
                  🏠 Back to Dashboard
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Answer Review */}
          <Card className="eco-card border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="text-success mb-4">📊 Review Your Answers</h3>
              <div className="text-start">
                {answers.map((answer, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1">
                        <strong>Q{index + 1}: {answer.question}</strong>
                      </div>
                      <span className={`badge ${answer.isCorrect ? 'bg-success' : 'bg-danger'}`}>
                        {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <div className="ms-3">
                      <p className="mb-1">
                        <small className="text-muted">Your answer: </small>
                        <span className={answer.isCorrect ? 'text-success fw-semibold' : 'text-danger'}>
                          {answer.selectedAnswer}
                        </span>
                      </p>
                      {!answer.isCorrect && (
                        <p className="mb-1">
                          <small className="text-muted">Correct answer: </small>
                          <span className="text-success fw-semibold">{answer.correctAnswer}</span>
                        </p>
                      )}
                      <p className="mb-0">
                        <small className="text-muted">💡 {answer.explanation}</small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-success mb-3">
          🧩 Climate Quiz
        </h1>
        <p className="lead text-muted">
          Test your knowledge about climate change and environmental issues
        </p>
      </div>

      {/* Progress */}
      <Card className="eco-card border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-muted">Score: {score}</span>
          </div>
          <ProgressBar
            now={getProgressPercentage()}
            variant="success"
            style={{ height: '10px' }}
            className="rounded-pill"
          />
        </Card.Body>
      </Card>

      {/* Question Card */}
      <Card className="eco-card border-0 shadow-sm">
        <Card.Body className="p-5">
          {/* Question */}
          <div className="text-center mb-4">
            <Badge bg="info" className="mb-3">
              {question.category}
            </Badge>
            <h3 className="fw-bold mb-4">
              {question.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="row">
            {question.options.map((option, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <div
                  className={`quiz-option p-3 ${
                    selectedAnswer === option ? 'selected' : ''
                  } ${
                    showFeedback && option === question.correctAnswer
                      ? 'correct'
                      : ''
                  } ${
                    showFeedback && selectedAnswer === option && option !== question.correctAnswer
                      ? 'incorrect'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  style={{
                    cursor: showFeedback ? 'default' : 'pointer',
                    border: showFeedback && option === question.correctAnswer
                      ? '2px solid #2ecc71'
                      : showFeedback && selectedAnswer === option && option !== question.correctAnswer
                      ? '2px solid #e74c3c'
                      : '2px solid #ecf0f1'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      {showFeedback && option === question.correctAnswer ? (
                        <span style={{ fontSize: '1.5rem' }}>✓</span>
                      ) : showFeedback && selectedAnswer === option && option !== question.correctAnswer ? (
                        <span style={{ fontSize: '1.5rem' }}>✗</span>
                      ) : (
                        <span style={{ fontSize: '1.2rem' }}>{String.fromCharCode(65 + index)}.</span>
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <strong>{option}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <Alert
              variant={selectedAnswer === question.correctAnswer ? 'success' : 'danger'}
              className="mt-4 alert-eco"
            >
              <Alert.Heading>
                {selectedAnswer === question.correctAnswer ? '🎉 Correct!' : '📚 Incorrect'}
              </Alert.Heading>
              <p className="mb-0">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="text-center mt-4">
            {!showFeedback ? (
              <Button
                variant="success"
                size="lg"
                className="btn-eco"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
              >
                Submit Answer
              </Button>
            ) : (
              <div>
                <p className="text-muted mb-3">
                  Moving to next question automatically...
                </p>
                {currentQuestion < questions.length - 1 && (
                  <Button
                    variant="outline-success"
                    className="btn-eco"
                    onClick={() => {
                      setCurrentQuestion(currentQuestion + 1);
                      setSelectedAnswer(null);
                      setShowFeedback(false);
                    }}
                  >
                    Next Question →
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};