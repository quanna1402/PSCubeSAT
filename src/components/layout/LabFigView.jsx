import labWordmark from '../../assets/lab-ui/lab-wordmark.svg';
import iconPlay from '../../assets/lab-ui/icon-play.svg';
import iconBook from '../../assets/lab-ui/icon-book.svg';
import iconGoal from '../../assets/lab-ui/icon-goal.svg';
import iconCube from '../../assets/lab-ui/icon-cube-logo.svg';
import iconArrow from '../../assets/lab-ui/icon-circle-arrow.svg';

// Giao diện Lab 0 (0.1 Video, 0.2 Tài liệu, 0.3 Thành phần) theo Figma "LMS - LAB 0.x" và "Điều hướng".
// Dữ liệu, tiến độ và quy tắc hoàn thành do LabLayout truyền vào; component này chỉ trình bày.
const COMPONENTS_TITLE = 'Khám phá PTIT STEM CubeSAT';

function Tab({ icon, label = '', small = false, square = false, flip = false }) {
  return <div className={`fig-tab${small ? ' fig-tab--small' : ''}${square ? ' fig-tab--square' : ''}`}>
    <img src={icon} alt="" className={`fig-tab-icon${flip ? ' is-flipped' : ''}`} draggable="false" />
    {label && <h2 className="fig-tab-label">{label}</h2>}
  </div>;
}

export default function LabFigView({
  lab, lesson, lessons, lessonIndex, completedCount, completionPercent,
  videoNode, docNode, componentsNode, selectLesson,
  canComplete, completed, completeLesson, resetLesson, completeError, remainingSeconds,
}) {
  const number = `${lab.id}.${lessonIndex + 1}`;
  const title = lesson.type === 'video' ? lab.title : lesson.type === 'components' ? COMPONENTS_TITLE : lesson.title;
  const previous = lessons[lessonIndex - 1];
  const next = lessons[lessonIndex + 1];
  const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  return <div className="lab-course-view lab-fig animate-fadeInUp" key={`${lab.id}:${lesson.id}`}>
    <section className="fig-progress" aria-label="Tiến độ Lab">
      <div className="fig-progress-head">
        <div>
          <h2 className="fig-progress-title">Tiến độ Lab {lab.id}</h2>
          <p className="fig-progress-sub">{completedCount}/{lessons.length} lesson đã hoàn thành</p>
        </div>
        <b className="fig-progress-percent">{completionPercent}%</b>
      </div>
      <div className="fig-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completionPercent} aria-label={`Hoàn thành ${completionPercent}% Lab ${lab.id}`}>
        <span style={{ width: `${completionPercent}%` }} />
      </div>
    </section>

    {lesson.type === 'video' && <section className="fig-card" aria-label={`${lesson.label}: ${lesson.title}`}>
      <Tab icon={iconPlay} label="Video bài giảng" />
      <div className="fig-surface fig-surface--video">{videoNode}</div>
    </section>}
    {lesson.type === 'document' && <section className="fig-card" aria-label={`${lesson.label}: ${lesson.title}`}>
      <Tab icon={iconBook} label="Tài liệu hướng dẫn" flip />
      <div className="fig-surface fig-surface--doc">{docNode}</div>
    </section>}
    {lesson.type === 'components' && <section className="fig-card fig-card--components" aria-label="Khám phá các phân hệ CubeSat">
      <Tab icon={iconCube} square />
      <div className="fig-components">{componentsNode}</div>
    </section>}

    <header className="fig-title">
      <img src={labWordmark} alt="" className="fig-title-lab" draggable="false" />
      <span className="fig-title-number" aria-hidden="true">{number}</span>
      <h1 className="fig-title-text"><span className="sr-only">Lab {number}: </span>{title}</h1>
    </header>

    {lesson.type === 'video' && <section className="fig-card fig-card--soft">
      <Tab icon={iconGoal} label="Mục tiêu bài học" small />
      <div className="fig-surface fig-surface--note">
        {lab.description
          ? <><p>{lab.description}</p><p>Nội dung phần này: {lesson.title}.</p></>
          : <p className="fig-placeholder">Tài liệu đang được cập nhật...</p>}
      </div>
    </section>}

    <nav className="fig-pagination" aria-label="Điều hướng bài học">
      <button type="button" className="fig-page-button" disabled={!previous} onClick={() => previous && selectLesson(previous.id)}>
        <img src={iconArrow} alt="" className="fig-page-arrow fig-page-arrow--back" draggable="false" />
        <span>Phần trước</span>
      </button>
      <span className="fig-pagination-divider" aria-hidden="true" />
      <button type="button" className={`fig-complete-button${completed ? ' is-done' : ''}`}
        disabled={!completed && !canComplete} onClick={completed ? resetLesson : completeLesson}
        title={completed ? 'Nhấn để đặt lại về chưa hoàn thành' : undefined}
        aria-label={completed ? 'Đã hoàn thành. Nhấn để đặt lại về chưa hoàn thành' : undefined}>
        {completed ? '✓ Đã hoàn thành' : canComplete ? 'Hoàn thành bài học' : `Còn ${formatTime(remainingSeconds)}`}
      </button>
      <span className="fig-pagination-divider" aria-hidden="true" />
      <button type="button" className="fig-page-button" disabled={!next} onClick={() => next && selectLesson(next.id)}>
        <span>Phần tiếp theo</span>
        <img src={iconArrow} alt="" className="fig-page-arrow" draggable="false" />
      </button>
      <span className="sr-only" role="status">Phần {lessonIndex + 1} / {lessons.length}</span>
    </nav>
    {completeError && <p className="fig-complete-error" role="alert">{completeError}</p>}
  </div>;
}
