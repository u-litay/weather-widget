import React, { useEffect, useState } from 'react';
import "./Modal.css";

interface ModalProps {
  active: boolean;
  setActive: (value: boolean) => void;
  content: 'settings' | 'manageLocations';
  setLocation: (location: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  active,
  setActive,
  content,
  setLocation
}) => {
  const [inputValue, setInputValue] = useState<string>('Saransk');

  useEffect(() => {
    if (active) {
      document.body.classList.add("modal-active");
    } else {
      document.body.classList.remove("modal-active");
    }
    return () => document.body.classList.remove("modal-active");
  }, [active]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocation(inputValue)
  }

  if (!active) return null;

    return (
        <div className="modal" onClick={() => setActive(false)}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                {content === "settings" && (
                    <div className='cont'>
                      <div className='get-back' onClick={() => setActive(false)}></div>
                        <h2 className='hd'>Settings</h2>
                        <ul>
                            <div className='right-settings'>°C</div>
                            <li>Temperature unit</li>
                            <div className='right-settings'>km/h</div>
                            <li>Wind speed unit</li>
                            <div className='right-settings'>mbar</div>
                            <li>Atmospheric pressure unit</li>
                            <hr />
                            <li>About</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                )}
                {content === "manageLocations" && (
                    <div className='cont'>
                      <div className='get-back' onClick={() => setActive(false)}></div>
                        <h2>Manage Locations</h2>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                placeholder="Search Your City"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleFormSubmit(e);
                                  }
                                }
                              }
                            />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;