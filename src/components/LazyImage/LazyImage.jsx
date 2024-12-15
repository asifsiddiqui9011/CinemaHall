import { useState } from "react";


const LazyImage = ({ src, alt, className, style }) => {
    const [loaded, setLoaded] = useState(false);
  
    return (
      <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
        {/* Placeholder */}
        {!loaded && (
          <div
            className="image-placeholder"
            style={{
              backgroundColor: '#eee',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              opacity: 1,
              transition: 'opacity 0.5s ease-in-out',
            }}
          ></div>
        )}
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            width: '100%',
            height: 'auto',
          }}
          onLoad={() => setLoaded(true)}
          onError={() => console.error(`Failed to load image: ${src}`)}
        />
      </div>
    );
  };

  
  export default LazyImage;