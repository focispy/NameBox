function SettingsModal({ onClose, volume, setVolume, brightness, setBrightness }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Настройки</h3>

        <div className="slider-container">
          <label htmlFor="volume-slider">
            Громкость: <span className="slider-value">{volume}%</span>
          </label>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        <div className="slider-container">
          <label htmlFor="brightness-slider">
            Яркость: <span className="slider-value">{brightness}%</span>
          </label>
          <input
            id="brightness-slider"
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(e.target.value)}
          />
        </div>

        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
