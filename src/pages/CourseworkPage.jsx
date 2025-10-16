import './CourseworkPage.css';

const coursework = [
  {
    title: 'Fall 2025',
    items: [
      { code: 'ECE 438', name: 'Communication Networks' },
      { code: 'ECE 374', name: 'Algorithms & Models of Computation' },
      { code: 'ECE 484', name: 'Principles of Safe Autonomy' },
      { code: 'ECE 329', name: 'Fields & Waves I' },
    ],
  },
  {
    title: 'Spring 2025',
    items: [
      { code: 'ECE 391', name: 'Computer Systems Engineering' },
      { code: 'ECE 494', name: 'Deep Learning for Computer Vision' },
    ],
  },
  {
    title: 'Fall 2024',
    items: [
      { code: 'ECE 385', name: 'Digital Systems Laboratory' },
      { code: 'CS 225', name: 'Data Structures' },
      { code: 'ECE 210', name: 'Analog Signal Processing' },
      { code: 'ECE 298', name: 'Semiconductor Chips Revolution' },
    ],
  },
  {
    title: 'Spring 2024',
    items: [
      { code: 'ECE 110', name: 'Introduction to Electronics' },
      { code: 'ECE 220', name: 'Computer Systems & Programming' },
      { code: 'ECE 398', name: 'Quantum Systems I' },
      { code: 'CS 450', name: 'Numerical Analysis' },
      { code: 'PHYS 225', name: 'Relativity with Math Applications' },
    ],
  },
  {
    title: 'Fall 2023',
    items: [
      { code: 'ECE 120', name: 'Introduction to Computing' },
      { code: 'ECE 198', name: 'James Scholar Honors Lab' },
      { code: 'PHYS 213', name: 'Thermal Physics' },
      { code: 'PHYS 214', name: 'Quantum Physics (PROF)' },
      { code: 'CHEM 102', name: 'General Chemistry' },
    ],
  },
];

const highSchool = [
  {
    school: 'George Mason University',
    courses: [
      { code: 'MATH 213', name: 'Analytic Geometry & Calculus III' },
      { code: 'MATH 214', name: 'Elementary Differential Equations' },
      { code: 'MATH 125', name: 'Discrete Mathematics I' },
      { code: 'STAT 346', name: 'Probability for Engineering' },
    ],
  },
  {
    school: 'University of Minnesota Talented Youth Mathematics Program',
    courses: [{ code: 'MATH 2243/2373', name: 'Linear Algebra & Differential Equations' }],
  },
];

const CourseworkPage = () => (
  <section>
    <h2>Coursework @ UIUC</h2>
    <div className="coursework-grid">
      {coursework.map(({ title, items }) => (
        <div key={title}>
          <strong>{title}</strong>
          <ul>
            {items.map(({ code, name }) => (
              <li key={code}>
                <tt>{code}:</tt> {name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <h3>High School</h3>
    {highSchool.map(({ school, courses }) => (
      <div key={school} style={{ marginBottom: '1.5rem' }}>
        <p>
          <i>{school}</i>
        </p>
        <ul>
          {courses.map(({ code, name }) => (
            <li key={code}>
              <tt>{code}:</tt> {name}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);

export default CourseworkPage;
