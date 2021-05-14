import { useRef, useEffect } from 'react';
import { RotateRight, Error } from '@material-ui/icons';

const IconOverlay = ({ icon, iconAnimation, iconFill, overlayBg, showWhen }) => {
  const overlayRef = useRef();
  const iconRef = useRef();

  const icons = {
    loading: RotateRight,
    error: Error
  }

  const IconComponent = icons[icon];

  useEffect(() => {
    if (iconAnimation) iconRef.current.style.setProperty('--icon-animation', iconAnimation);
    if (iconFill) iconRef.current.style.setProperty('--icon-fill', iconFill);
    if (overlayBg) overlayRef.current.style.setProperty('--overlay-bg', overlayBg);
  }, []);

  return (
    <span ref={overlayRef} className="ui-icon-overlay" show={showWhen ? "true" : "false"}>
      <IconComponent ref={iconRef}/>
    </span>
  );
}

export default IconOverlay;