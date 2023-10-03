export const SubscriptionsInput = ({ subscriptionData, handleChange }) => {
  return (
    <>
      <div className="newDataDiv">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={subscriptionData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="newDataDiv">
        <label>Logo</label>
        <input
          type="text"
          name="logo"
          value={subscriptionData.logo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="newDataDiv">
        <label>Subscription Type</label>
        <select
          name="type"
          value={subscriptionData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="streaming">Streaming</option>
          <option value="fiber">Fiber</option>
          <option value="music">Music</option>
          <option value="Gym">Gym</option>
        </select>
      </div>
      <div className="newDataDiv">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={subscriptionData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="newDataDiv">
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={subscriptionData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="newDataDiv">
        <label>Platform</label>
        <input
          type="text"
          name="platform"
          value={subscriptionData.platform}
          onChange={handleChange}
          required
        />
      </div>
      <div className="newDataDiv">
        <label>Billing Cycle</label>
        <select
          name="billing_cycle"
          value={subscriptionData.billing_cycle}
          onChange={handleChange}
          required
        >
          <option value="">Select Billing Cycle</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
    </>
  );
};
