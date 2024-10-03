import Button from './Button';
import '../../css/rightcontent.css';

function RightContent() {
  return (
    <div className="right">
      <h1>Activate Account</h1>
      <form>
        {/* Policy Number Input */}
        <div className="form-group">
          <label htmlFor="policyNumber">Policy Number</label>
          <input type="text" id="policyNumber" />
        </div>

        {/* Phone Number Input */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" />
        </div>

        {/* Zip Code Input */}
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input type="text" id="zipCode" />
        </div>

        {/* Activate Button */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Button text="Activate" />
        </div>
      </form>
    </div>
  );
}

export default RightContent;
