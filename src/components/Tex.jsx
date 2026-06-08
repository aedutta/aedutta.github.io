import katex from 'katex';

const Tex = ({ children, displayMode = false }) => {
  const html = katex.renderToString(children, {
    displayMode,
    throwOnError: false,
    output: 'html',
  });
  const Tag = displayMode ? 'div' : 'span';
  return <Tag className="tex" dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Tex;
