import React, { useMemo, useState } from "react";

const CONDITIONS = [
  {
    id: "spinner",
    label: "Loading spinner",
    shortLabel: "Spinner",
    description: "A traditional spinner is shown while the content is loading."
  },
  {
    id: "skeleton",
    label: "Skeleton screen",
    shortLabel: "Skeleton",
    description: "Placeholder blocks are shown before the real content appears."
  },
  {
    id: "progressive",
    label: "Progressive rendering",
    shortLabel: "Progressive",
    description: "Parts of the content appear step by step while the page is still loading."
  },
  {
    id: "progress_bar",
    label: "Progress bar",
    shortLabel: "Progress bar",
    description: "A progress indicator shows how far the loading process has come."
  },
  {
    id: "optimistic",
    label: "Optimistic loading",
    shortLabel: "Optimistic",
    description: "Temporary content is shown immediately and then replaced with updated content."
  }
];

const TASKS = [
  {
    id: "train_delay",
    title: "Task 1: Load train delay information",
    instruction:
      "Imagine that you are checking if your train is delayed. Press the button, wait for the content, then answer the questions based on how the loading experience felt.",
    button: "Load train information",
    resultTitle: "Train delay information",
    resultItems: [
      "Stockholm C → Malmö C",
      "Departure: 14:32",
      "Current delay: 12 minutes",
      "Platform: 10"
    ]
  },
  {
    id: "profile_overview",
    title: "Task 2: Load profile overview",
    instruction:
      "Imagine that you are opening your profile page in a web application. Press the button, wait for the content, then answer the questions.",
    button: "Load profile",
    resultTitle: "Profile overview",
    resultItems: [
      "Name: Test User",
      "Saved stations: 4",
      "Recent activity: 3 updates",
      "Status: Logged in"
    ]
  },
  {
    id: "search_results",
    title: "Task 3: Load search results",
    instruction:
      "Imagine that you searched in a web application. Press the button, wait for the results, then answer the questions.",
    button: "Load search results",
    resultTitle: "Search results",
    resultItems: [
      "Result 1: Stockholm Central",
      "Result 2: Göteborg Central",
      "Result 3: Malmö Central",
      "Result 4: Uppsala Central"
    ]
  },
  {
    id: "order_status",
    title: "Task 4: Load order status",
    instruction:
      "Imagine that you are checking the status of an online order. Press the button, wait for the content, then answer the questions.",
    button: "Load order status",
    resultTitle: "Order status",
    resultItems: [
      "Order: #24831",
      "Status: Packed",
      "Estimated delivery: Tomorrow",
      "Carrier: PostNord"
    ]
  },
  {
    id: "dashboard_stats",
    title: "Task 5: Load dashboard statistics",
    instruction:
      "Imagine that you are opening a dashboard with updated statistics. Press the button, wait for the content, then answer the questions.",
    button: "Load dashboard",
    resultTitle: "Dashboard statistics",
    resultItems: [
      "Visitors today: 1,248",
      "Conversion rate: 4.7%",
      "Active sessions: 86",
      "Latest update: Just now"
    ]
  }
];

const SCALE = [1, 2, 3, 4, 5];
const TOTAL_DELAY = 2200;

function shuffleArray(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy;
}

function ScaleQuestion({ label, value, onChange, left, right, disabled }) {
  return (
    <div className="question-card">
      <p className="question-label">{label}</p>
      <div className="scale-grid">
        {SCALE.map((number) => (
          <button
            key={number}
            type="button"
            disabled={disabled}
            onClick={() => onChange(number)}
            className={value === number ? "scale-button active" : "scale-button"}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="scale-help">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

function SpinnerLoader() {
  return (
    <div className="loading-box centered">
      <div className="spinner" />
      <p>Loading content...</p>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="loading-box">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
    </div>
  );
}

function ProgressiveLoader({ task, progressStep }) {
  const visibleItems = task.resultItems.slice(0, progressStep);

  return (
    <div className="loading-box">
      <div className="result-header">
        <div>
          <h3>{task.resultTitle}</h3>
          <p>Content is appearing progressively...</p>
        </div>
        <div className="small-spinner" />
      </div>

      <div className="result-list">
        {visibleItems.map((item) => (
          <div key={item} className="result-item fade-in">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressBarLoader({ progressValue }) {
  return (
    <div className="loading-box centered">
      <div className="progress-wrapper">
        <div className="progress-label-row">
          <span>Loading content</span>
          <span>{progressValue}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressValue}%` }} />
        </div>
      </div>
      <p>The interface shows how much of the loading process is complete.</p>
    </div>
  );
}

function OptimisticLoader({ task }) {
  return (
    <div className="loading-box">
      <div className="result-header">
        <div>
          <h3>{task.resultTitle}</h3>
          <p>Showing temporary content while updated data is loading...</p>
        </div>
        <span className="updating-pill">Updating</span>
      </div>

      <div className="result-list optimistic-list">
        {task.resultItems.map((item, index) => (
          <div key={item} className="result-item optimistic-item fade-in">
            {index === 0 ? item : `Previous data: ${item}`}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultCard({ task }) {
  return (
    <div className="loading-box result-card fade-in">
      <div className="result-header">
        <div>
          <h3>{task.resultTitle}</h3>
          <p>Content loaded.</p>
        </div>
        <span className="success-icon">✓</span>
      </div>

      <div className="result-list">
        {task.resultItems.map((item) => (
          <div key={item} className="result-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingDemo({
  condition,
  task,
  loadingState,
  progressStep,
  progressValue,
  onStart,
  onReplay
}) {
  return (
    <>
      {loadingState === "idle" && (
        <div className="loading-box centered dashed">
          <button type="button" className="primary-button" onClick={onStart}>
            {task.button}
          </button>
        </div>
      )}

      {loadingState === "loading" && condition.id === "spinner" && <SpinnerLoader />}
      {loadingState === "loading" && condition.id === "skeleton" && <SkeletonLoader />}
      {loadingState === "loading" && condition.id === "progressive" && (
        <ProgressiveLoader task={task} progressStep={progressStep} />
      )}
      {loadingState === "loading" && condition.id === "progress_bar" && (
        <ProgressBarLoader progressValue={progressValue} />
      )}
      {loadingState === "loading" && condition.id === "optimistic" && <OptimisticLoader task={task} />}
      {loadingState === "done" && (
        <>
          <ResultCard task={task} />
          <button type="button" className="secondary-button replay-button" onClick={onReplay}>
            Replay
          </button>
        </>
      )}
    </>
  );
}

function StrategyDemoCard({ condition }) {
  const [state, setState] = useState("idle");
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  function play() {
    setState("loading");
    setStep(0);
    setProgress(0);

    if (condition.id === "progressive") {
      setTimeout(() => setStep(1), 400);
      setTimeout(() => setStep(2), 800);
      setTimeout(() => setStep(3), 1300);
      setTimeout(() => setStep(4), 1800);
    }

    if (condition.id === "progress_bar") {
      setTimeout(() => setProgress(25), 400);
      setTimeout(() => setProgress(50), 800);
      setTimeout(() => setProgress(75), 1300);
      setTimeout(() => setProgress(100), 1800);
    }

    setTimeout(() => {
      setState("done");
    }, TOTAL_DELAY);
  }

  return (
    <div className="strategy-card">
      <h3>{condition.label}</h3>
      <p>{condition.description}</p>

      {state === "idle" && (
        <button type="button" className="secondary-button" onClick={play}>
          Play demo
        </button>
      )}

      {state === "loading" && condition.id === "spinner" && <SpinnerLoader />}
      {state === "loading" && condition.id === "skeleton" && <SkeletonLoader />}
      {state === "loading" && condition.id === "progressive" && (
        <ProgressiveLoader task={TASKS[0]} progressStep={step} />
      )}
      {state === "loading" && condition.id === "progress_bar" && (
        <ProgressBarLoader progressValue={progress} />
      )}
      {state === "loading" && condition.id === "optimistic" && (
        <OptimisticLoader task={TASKS[0]} />
      )}

      {state === "done" && (
        <>
          <ResultCard task={TASKS[0]} />
          <button
            type="button"
            className="secondary-button replay-button"
            onClick={() => {
              setState("idle");
              setStep(0);
              setProgress(0);
            }}
          >
            Replay
          </button>
        </>
      )}
    </div>
  );
}

function ConditionResultTable({ records }) {
  if (records.length === 0) {
    return null;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Strategy</th>
            <th>Speed</th>
            <th>Smoothness</th>
            <th>Clarity</th>
            <th>Satisfaction</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={`${record.participantId}-${record.conditionId}`}>
              <td>{record.orderNumber}</td>
              <td>{record.conditionLabel}</td>
              <td>{record.perceivedSpeed}</td>
              <td>{record.smoothness}</td>
              <td>{record.clarity}</td>
              <td>{record.satisfaction}</td>
              <td>{record.comment || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("");
  const [started, setStarted] = useState(false);
  const [participantId, setParticipantId] = useState("");
  const [experience, setExperience] = useState(""); // kept for developer mode only
  const [conditionOrder, setConditionOrder] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingState, setLoadingState] = useState("idle");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [progressStep, setProgressStep] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [answers, setAnswers] = useState({});
  const [records, setRecords] = useState([]);
  const [finalPreference, setFinalPreference] = useState("");
  const [finalRanking, setFinalRanking] = useState("");
  const [finalComment, setFinalComment] = useState("");
  const [developerPrediction, setDeveloperPrediction] = useState("");
  const [developerImplementation, setDeveloperImplementation] = useState("");
  const [developerFastest, setDeveloperFastest] = useState("");
  const [developerTrust, setDeveloperTrust] = useState("");
  const [developerReasoning, setDeveloperReasoning] = useState("");
  const [developerSubmitted, setDeveloperSubmitted] = useState(false);

  const currentCondition = conditionOrder[currentIndex];
  const currentTask = TASKS[currentIndex % TASKS.length];
  const isComplete = started && currentIndex >= conditionOrder.length;
  const canStart = participantId.trim() !== "";

  const currentAnswer = useMemo(() => {
    const key = currentCondition?.id || "";

    return answers[key] || {
      perceivedSpeed: "",
      smoothness: "",
      clarity: "",
      satisfaction: "",
      comment: ""
    };
  }, [answers, currentCondition]);

  function updateCurrentAnswer(field, value) {
    const key = currentCondition.id;

    setAnswers((previous) => ({
      ...previous,
      [key]: {
        ...(previous[key] || {}),
        [field]: value
      }
    }));
  }

  function startStudy(selectedMode) {
    setMode(selectedMode);
    setConditionOrder(shuffleArray(CONDITIONS));
    setStarted(false);
    setCurrentIndex(0);
    setLoadingState("idle");
    setRecords([]);
    setAnswers({});
    setFinalPreference("");
    setFinalRanking("");
    setFinalComment("");
    setDeveloperPrediction("");
    setDeveloperImplementation("");
    setDeveloperFastest("");
    setDeveloperTrust("");
    setDeveloperReasoning("");
    setDeveloperSubmitted(false);
  }

  function beginParticipantFlow() {
    if (!canStart) {
      return;
    }

    setStarted(true);
    setCurrentIndex(0);
    setLoadingState("idle");
    setProgressStep(0);
    setProgressValue(0);
  }

  function runLoadingTest() {
    setLoadingState("loading");
    setProgressStep(0);
    setProgressValue(0);
    setStartTime(performance.now());
    setEndTime(null);

    if (currentCondition.id === "progressive") {
      setTimeout(() => setProgressStep(1), 450);
      setTimeout(() => setProgressStep(2), 900);
      setTimeout(() => setProgressStep(3), 1500);
      setTimeout(() => setProgressStep(4), 1900);
    }

    if (currentCondition.id === "progress_bar") {
      setTimeout(() => setProgressValue(25), 400);
      setTimeout(() => setProgressValue(50), 850);
      setTimeout(() => setProgressValue(75), 1450);
      setTimeout(() => setProgressValue(100), 1900);
    }

    setTimeout(() => {
      setLoadingState("done");
      setEndTime(performance.now());
    }, TOTAL_DELAY);
  }

  function canContinue() {
    return (
      loadingState === "done" &&
      currentAnswer.perceivedSpeed &&
      currentAnswer.smoothness &&
      currentAnswer.clarity &&
      currentAnswer.satisfaction
    );
  }

  function saveAndContinue() {
    if (!canContinue()) {
      return;
    }

    const durationMs = startTime && endTime ? Math.round(endTime - startTime) : "";

    const newRecord = {
      participantId: participantId.trim(),
      participantType: mode,
      experience,
      orderNumber: currentIndex + 1,
      conditionId: currentCondition.id,
      conditionLabel: currentCondition.label,
      taskId: currentTask.id,
      perceivedSpeed: currentAnswer.perceivedSpeed,
      smoothness: currentAnswer.smoothness,
      clarity: currentAnswer.clarity,
      satisfaction: currentAnswer.satisfaction,
      comment: currentAnswer.comment || "",
      actualDelayMs: durationMs,
      conditionOrder: conditionOrder.map((condition) => condition.id).join(" > ")
    };

    setRecords((previous) => [...previous, newRecord]);
    setCurrentIndex((previous) => previous + 1);
    setLoadingState("idle");
    setStartTime(null);
    setEndTime(null);
    setProgressStep(0);
    setProgressValue(0);
  }

  function resetAll() {
    setMode("");
    setStarted(false);
    setParticipantId("");
    setExperience("");
    setConditionOrder([]);
    setCurrentIndex(0);
    setLoadingState("idle");
    setStartTime(null);
    setEndTime(null);
    setProgressStep(0);
    setProgressValue(0);
    setAnswers({});
    setRecords([]);
    setFinalPreference("");
    setFinalRanking("");
    setFinalComment("");
    setDeveloperPrediction("");
    setDeveloperImplementation("");
    setDeveloperFastest("");
    setDeveloperTrust("");
    setDeveloperReasoning("");
    setDeveloperSubmitted(false);
  }

  function canSubmitDeveloper() {
    return (
      participantId.trim() !== "" &&
      experience !== "" &&
      developerPrediction !== "" &&
      developerImplementation !== "" &&
      developerFastest !== "" &&
      developerTrust !== "" &&
      developerReasoning.trim() !== ""
    );
  }

  return (
    <>
      <style>{styles}</style>
      <main className="page">
        <section className="hero-card">
          <p className="eyebrow">Thesis prototype</p>
          <h1>User Experience in Web Applications: Loading Strategies</h1>
          <p>
            This prototype compares five loading strategies under the same artificial delay:
            loading spinner, skeleton screen, progressive rendering, progress bar, and optimistic
            loading. It supports both end user testing and developer prediction data.
          </p>
        </section>

        {!mode && (
          <section className="card">
            <h2>Choose study flow</h2>
            <p className="muted">
              Select the role of the participant. End users rate their actual experience.
              Developers predict what users will prefer and explain what they would implement.
            </p>

            <div className="choice-grid">
              <button type="button" className="choice-card" onClick={() => startStudy("end_user")}>
                <span className="choice-title">End user study</span>
                <span>
                  Participant tests each loading strategy and rates perceived speed, smoothness,
                  clarity, satisfaction, preference, ranking, and feedback.
                </span>
              </button>

              <button type="button" className="choice-card" onClick={() => startStudy("developer")}>
                <span className="choice-title">Developer study</span>
                <span>
                  Developer reviews the same strategies and predicts user preference, practical
                  implementation choice, perceived speed, trust, and reasoning.
                </span>
              </button>
            </div>
          </section>
        )}

        {mode === "end_user" && !started && (
          <section className="card">
            <h2>End user setup</h2>
            <p className="muted">
              Enter a participant code before starting. Do not use real names so the responses stay anonymous.
            </p>

            <div className="form-grid">
              <label>
                <span>Participant code (e.g. U01)</span>
                <input
                  value={participantId}
                  onChange={(event) => setParticipantId(event.target.value)}
                  placeholder="Example: U01"
                />
              </label>
            </div>

            <div className="info-box">
              <strong>Study flow:</strong> The participant completes five loading conditions in a
              randomized order. Each condition uses the same controlled delay of about 2.2 seconds.
            </div>

            <div className="button-row">
              <button type="button" className="primary-button" disabled={!canStart} onClick={beginParticipantFlow}>
                Start end user study
              </button>
              <button type="button" className="secondary-button" onClick={resetAll}>
                Back
              </button>
            </div>
          </section>
        )}

        {mode === "end_user" && started && !isComplete && currentCondition && (
          <div className="study-grid">
            <section className="card">
              <div className="condition-top">
                <div>
                  <p className="eyebrow">Condition {currentIndex + 1} of {conditionOrder.length}</p>
                  <h2>{currentCondition.label}</h2>
                </div>
                <span className="pill">{currentCondition.shortLabel}</span>
              </div>

              <p className="muted">{currentCondition.description}</p>
              <h3>{currentTask.title}</h3>
              <p className="muted">{currentTask.instruction}</p>

              <LoadingDemo
                condition={currentCondition}
                task={currentTask}
                loadingState={loadingState}
                progressStep={progressStep}
                progressValue={progressValue}
                onStart={runLoadingTest}
                onReplay={() => {
                  setLoadingState("idle");
                  setProgressStep(0);
                  setProgressValue(0);
                  setStartTime(null);
                  setEndTime(null);
                }}
              />
            </section>

            <section className="card">
              <h2>End user questionnaire</h2>
              <p className="muted">Answer after the content has finished loading.</p>

              <ScaleQuestion
                label="How fast did the loading feel?"
                value={currentAnswer.perceivedSpeed}
                onChange={(value) => updateCurrentAnswer("perceivedSpeed", value)}
                left="Very slow"
                right="Very fast"
                disabled={loadingState !== "done"}
              />

              <ScaleQuestion
                label="How smooth did the interaction feel?"
                value={currentAnswer.smoothness}
                onChange={(value) => updateCurrentAnswer("smoothness", value)}
                left="Not smooth"
                right="Very smooth"
                disabled={loadingState !== "done"}
              />

              <ScaleQuestion
                label="How clear was the loading state?"
                value={currentAnswer.clarity}
                onChange={(value) => updateCurrentAnswer("clarity", value)}
                left="Very unclear"
                right="Very clear"
                disabled={loadingState !== "done"}
              />

              <ScaleQuestion
                label="How satisfied were you with this loading experience?"
                value={currentAnswer.satisfaction}
                onChange={(value) => updateCurrentAnswer("satisfaction", value)}
                left="Not satisfied"
                right="Very satisfied"
                disabled={loadingState !== "done"}
              />

              <label>
                <span>Optional written feedback</span>
                <textarea
                  value={currentAnswer.comment || ""}
                  disabled={loadingState !== "done"}
                  onChange={(event) => updateCurrentAnswer("comment", event.target.value)}
                  placeholder="What did you notice about this loading experience?"
                />
              </label>

              <button
                type="button"
                className="primary-button full-width"
                disabled={!canContinue()}
                onClick={saveAndContinue}
              >
                Save and continue
              </button>
            </section>
          </div>
        )}

        {mode === "end_user" && isComplete && (
          <section className="card">
            <h2>End user final questions</h2>
            <p className="muted">
              The participant has completed all five loading strategies. Fill in the final
              preference and ranking, then copy the results into your spreadsheet.
            </p>

            <label>
              <span>Which loading strategy did you prefer overall?</span>
              <select
                value={finalPreference}
                onChange={(event) => setFinalPreference(event.target.value)}
              >
                <option value="">Choose one</option>
                {CONDITIONS.map((condition) => (
                  <option key={condition.id} value={condition.id}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Rank the strategies from best to worst</span>
              <input
                value={finalRanking}
                onChange={(event) => setFinalRanking(event.target.value)}
                placeholder="Example: Skeleton > Progressive > Progress bar > Optimistic > Spinner"
              />
            </label>

            <label>
              <span>Final comment</span>
              <textarea
                value={finalComment}
                onChange={(event) => setFinalComment(event.target.value)}
                placeholder="Why did you prefer that strategy?"
              />
            </label>

            <div className="summary-card">
              <h3>Copy these final values</h3>
              <p><strong>Participant:</strong> {participantId}</p>
              <p><strong>Experience:</strong> {experience}</p>
              <p><strong>Condition order:</strong> {conditionOrder.map((condition) => condition.shortLabel).join(" > ")}</p>
              <p><strong>Final preference:</strong> {finalPreference || "Not answered"}</p>
              <p><strong>Final ranking:</strong> {finalRanking || "Not answered"}</p>
              <p><strong>Final comment:</strong> {finalComment || "-"}</p>
            </div>

            <ConditionResultTable records={records} />

            <div className="button-row">
              <button type="button" className="secondary-button" onClick={resetAll}>
                New participant
              </button>
            </div>
          </section>
        )}

        {mode === "developer" && !developerSubmitted && (
          <section className="card">
            <h2>Developer study</h2>
            <p className="muted">
              Review the five loading strategies below. Then answer what you think end users will
              prefer and what you would implement in practice.
            </p>

            <div className="form-grid">
              <label>
                <span>Participant code</span>
                <input
                  value={participantId}
                  onChange={(event) => setParticipantId(event.target.value)}
                  placeholder="Example: D01"
                />
              </label>

              <label>
                <span>Developer experience</span>
                <select
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                >
                  <option value="">Choose one</option>
                  <option value="student">Student developer</option>
                  <option value="junior">Junior developer</option>
                  <option value="intermediate">Intermediate developer</option>
                  <option value="senior">Senior developer</option>
                </select>
              </label>
            </div>

            <div className="strategy-list">
              {CONDITIONS.map((condition) => (
                <StrategyDemoCard key={condition.id} condition={condition} />
              ))}
            </div>

            <label>
              <span>Which strategy do you believe end users will prefer?</span>
              <select
                value={developerPrediction}
                onChange={(event) => setDeveloperPrediction(event.target.value)}
              >
                <option value="">Choose one</option>
                {CONDITIONS.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.label}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Which strategy would you implement in a real web application?</span>
              <select
                value={developerImplementation}
                onChange={(event) => setDeveloperImplementation(event.target.value)}
              >
                <option value="">Choose one</option>
                {CONDITIONS.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.label}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Which strategy do you think feels fastest to users?</span>
              <select
                value={developerFastest}
                onChange={(event) => setDeveloperFastest(event.target.value)}
              >
                <option value="">Choose one</option>
                {CONDITIONS.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.label}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Which strategy do you think makes users trust that the page is working?</span>
              <select
                value={developerTrust}
                onChange={(event) => setDeveloperTrust(event.target.value)}
              >
                <option value="">Choose one</option>
                {CONDITIONS.map((condition) => (
                  <option key={condition.id} value={condition.id}>{condition.label}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Why? Explain your reasoning.</span>
              <textarea
                value={developerReasoning}
                onChange={(event) => setDeveloperReasoning(event.target.value)}
                placeholder="Explain why you think users would prefer this strategy and why you would or would not implement it."
              />
            </label>

            <div className="button-row">
              <button
                type="button"
                className="primary-button"
                disabled={!canSubmitDeveloper()}
                onClick={() => setDeveloperSubmitted(true)}
              >
                Show developer result
              </button>
              <button type="button" className="secondary-button" onClick={resetAll}>
                Back
              </button>
            </div>
          </section>
        )}

        {mode === "developer" && developerSubmitted && (
          <section className="card">
            <h2>Developer result</h2>
            <p className="muted">Copy these values into your developer study spreadsheet.</p>

            <div className="summary-card">
              <p><strong>Participant:</strong> {participantId}</p>
              <p><strong>Developer experience:</strong> {experience}</p>
              <p><strong>Predicted user preference:</strong> {developerPrediction}</p>
              <p><strong>Would implement:</strong> {developerImplementation}</p>
              <p><strong>Predicted fastest:</strong> {developerFastest}</p>
              <p><strong>Predicted most trustworthy:</strong> {developerTrust}</p>
              <p><strong>Reasoning:</strong> {developerReasoning}</p>
            </div>

            <div className="button-row">
              <button type="button" className="secondary-button" onClick={resetAll}>
                New participant
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

const styles = `
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #f5f7fb;
    color: #172033;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  .page {
    width: min(1120px, calc(100% - 32px));
    margin: 0 auto;
    padding: 32px 0;
  }

  .hero-card,
  .card {
    background: #ffffff;
    border: 1px solid #e4e8f0;
    border-radius: 28px;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.06);
    padding: 28px;
    margin-bottom: 24px;
  }

  .hero-card h1 {
    max-width: 820px;
    margin: 0;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  .hero-card p,
  .muted {
    color: #657083;
    line-height: 1.7;
  }

  .eyebrow {
    margin: 0 0 10px;
    color: #64748b;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0 0 10px;
    font-size: 1.7rem;
    letter-spacing: -0.03em;
  }

  h3 {
    margin: 16px 0 8px;
  }

  .form-grid,
  .study-grid,
  .choice-grid {
    display: grid;
    gap: 20px;
  }

  .form-grid,
  .choice-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .study-grid {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: start;
  }

  .choice-card {
    text-align: left;
    border: 1px solid #d8dee9;
    border-radius: 22px;
    background: #f8fafc;
    padding: 22px;
    cursor: pointer;
    color: #526071;
    line-height: 1.6;
    transition: 0.15s ease;
  }

  .choice-card:hover {
    border-color: #172033;
    transform: translateY(-2px);
  }

  .choice-title {
    display: block;
    color: #172033;
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 8px;
  }

  label {
    display: grid;
    gap: 8px;
    margin: 14px 0;
  }

  label span,
  .question-label {
    font-weight: 700;
    color: #253047;
  }

  input,
  select,
  textarea {
    width: 100%;
    border: 1px solid #d8dee9;
    border-radius: 16px;
    padding: 13px 14px;
    background: #ffffff;
    color: #172033;
    outline: none;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: #172033;
    box-shadow: 0 0 0 4px rgba(23, 32, 51, 0.08);
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .info-box,
  .summary-card {
    background: #f7f9fc;
    border: 1px solid #e5eaf2;
    border-radius: 18px;
    padding: 16px;
    color: #526071;
    line-height: 1.6;
    margin: 18px 0;
  }

  .summary-card p {
    margin: 8px 0;
  }

  .primary-button,
  .secondary-button {
    border: none;
    border-radius: 16px;
    padding: 13px 18px;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease, background 0.15s ease;
  }

  .primary-button {
    background: #172033;
    color: #ffffff;
  }

  .secondary-button {
    background: #eef2f7;
    color: #172033;
  }

  .primary-button:hover:not(:disabled),
  .secondary-button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  button:disabled,
  textarea:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .full-width {
    width: 100%;
  }

  .button-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .replay-button {
    margin-top: 12px;
  }

  .condition-top,
  .result-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .pill {
    border-radius: 999px;
    background: #eef2f7;
    color: #526071;
    font-size: 0.8rem;
    font-weight: 800;
    padding: 8px 12px;
  }

  .loading-box {
    min-height: 245px;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    background: #ffffff;
    padding: 24px;
    margin-top: 20px;
  }

  .loading-box.centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    color: #657083;
    font-weight: 700;
  }

  .loading-box.dashed {
    border-style: dashed;
    background: #f8fafc;
  }

  .spinner,
  .small-spinner {
    border-radius: 50%;
    border-style: solid;
    border-color: #e2e8f0;
    border-top-color: #172033;
    animation: spin 0.9s linear infinite;
  }

  .spinner {
    width: 56px;
    height: 56px;
    border-width: 5px;
  }

  .small-spinner {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .skeleton {
    background: linear-gradient(90deg, #eef2f7 25%, #f8fafc 37%, #eef2f7 63%);
    background-size: 400% 100%;
    animation: shimmer 1.2s ease-in-out infinite;
    border-radius: 16px;
  }

  .skeleton-title {
    width: 60%;
    height: 28px;
    margin-bottom: 22px;
  }

  .skeleton-line {
    height: 44px;
    margin-bottom: 14px;
  }

  .skeleton-line.short {
    width: 75%;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  .result-header h3 {
    margin: 0 0 6px;
  }

  .result-header p {
    margin: 0;
    color: #657083;
    font-size: 0.95rem;
  }

  .success-icon {
    width: 34px;
    height: 34px;
    display: inline-grid;
    place-items: center;
    border-radius: 50%;
    background: #dcfce7;
    color: #15803d;
    font-weight: 900;
  }

  .result-list {
    display: grid;
    gap: 12px;
    margin-top: 18px;
  }

  .progress-wrapper {
    width: min(520px, 100%);
  }

  .progress-label-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: 800;
    color: #253047;
  }

  .progress-track {
    width: 100%;
    height: 18px;
    overflow: hidden;
    border-radius: 999px;
    background: #e2e8f0;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: #172033;
    transition: width 0.35s ease;
  }

  .updating-pill {
    border-radius: 999px;
    background: #fef3c7;
    color: #92400e;
    font-size: 0.78rem;
    font-weight: 900;
    padding: 8px 12px;
  }

  .optimistic-list {
    opacity: 0.78;
  }

  .optimistic-item {
    border-style: dashed;
  }

  .result-item {
    background: #f8fafc;
    border: 1px solid #edf2f7;
    border-radius: 16px;
    padding: 14px;
    font-weight: 650;
    color: #334155;
  }

  .fade-in {
    animation: fadeIn 0.25s ease both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .question-card {
    border: 1px solid #e3e8f1;
    border-radius: 18px;
    padding: 16px;
    margin: 14px 0;
    background: #ffffff;
  }

  .question-label {
    margin: 0 0 12px;
  }

  .scale-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
  }

  .scale-button {
    border: 1px solid #d8dee9;
    border-radius: 12px;
    background: #f8fafc;
    color: #253047;
    font-weight: 800;
    padding: 10px 0;
    cursor: pointer;
  }

  .scale-button.active {
    background: #172033;
    border-color: #172033;
    color: #ffffff;
  }

  .scale-help {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    color: #7b8797;
    font-size: 0.78rem;
  }

  .strategy-list {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    margin: 20px 0;
  }

  .strategy-card {
    border: 1px solid #e3e8f1;
    border-radius: 18px;
    background: #f8fafc;
    padding: 16px;
  }

  .strategy-card h3 {
    margin-top: 0;
    font-size: 1rem;
  }

  .strategy-card p {
    color: #657083;
    line-height: 1.5;
    font-size: 0.92rem;
  }

  .table-wrap {
    overflow-x: auto;
    margin: 20px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.92rem;
  }

  th,
  td {
    border: 1px solid #e3e8f1;
    padding: 10px;
    text-align: left;
    vertical-align: top;
  }

  th {
    background: #f8fafc;
    color: #253047;
  }

  @media (max-width: 1050px) {
    .strategy-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 850px) {
    .form-grid,
    .study-grid,
    .choice-grid,
    .strategy-list {
      grid-template-columns: 1fr;
    }

    .hero-card,
    .card {
      padding: 22px;
      border-radius: 22px;
    }
  }
`;
