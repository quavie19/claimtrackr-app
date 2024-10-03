import PropTypes from 'prop-types'; // Optional: To validate the props

const Button = ({ text, onClick, style, className, type }) => {
  const buttonStyles = {
    primary: {
      backgroundColor: '#007b8b',
      color: '#fff',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#015477',
      border: '1.5px solid #015477',
    },
  };

  // Use the style from buttonStyles based on the type prop
  const combinedStyles = {
    ...style, // Combine any inline styles passed as props
    ...(buttonStyles[type] || buttonStyles.primary), // Default to primary if type is not specified
  };

  return (
    <button
      className={`button-component ${className}`} // You can pass additional className as a prop
      onClick={onClick}
      style={combinedStyles}
      type={type} // Use the combined styles
    >
      {text}
    </button>
  );
};

// Prop validation (optional)
Button.propTypes = {
  text: PropTypes.string.isRequired, // Button text is required
  onClick: PropTypes.func, // Function to handle button clicks
  style: PropTypes.object, // Inline styles passed as an object
  className: PropTypes.string, // Additional classes for styling
  type: PropTypes.oneOf(['primary', 'secondary']), // Define the button type
};

// Default prop values (optional)
Button.defaultProps = {
  onClick: () => {}, // Empty function if no onClick is provided
  style: {
    borderRadius: '5px', // border-radius in camelCase
    padding: '10px 20px', // padding
    fontSize: '16px', // font-size in camelCase
    cursor: 'pointer', // cursor style
  },
  className: 'btn', // Default class for the button
};

export default Button;
