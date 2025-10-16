const headingTags = {
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
};

const Section = ({ title, children, headingLevel = 'h2' }) => {
  const Heading = headingTags[headingLevel] || 'h2';
  return (
    <section style={{ marginBottom: '1.75rem' }}>
      {title && <Heading>{title}</Heading>}
      {children}
    </section>
  );
};

export default Section;
