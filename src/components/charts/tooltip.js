import { useRef, useEffect } from 'react';

const Tooltip = ({ title, body, opacity, position }) => {
  const tooltip = useRef();

  useEffect(() => {
    tooltip.current.style.setProperty('top', `${position.y}px`);
    tooltip.current.style.setProperty('left', `${position.x}px`);
    tooltip.current.style.setProperty('opacity', opacity);
  }, [title, body, opacity, position])

  return (
    <div ref={tooltip} className="tooltip">
      {title}<br/>
      <b>{body}</b>
    </div>
  );
}

export default Tooltip;