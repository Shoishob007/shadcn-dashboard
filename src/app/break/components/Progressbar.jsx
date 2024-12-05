const ProgressBar = () => {
    return (
      <div className="flex justify-center items-center h-12">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex justify-center items-center">
            <span>1</span>
          </div>
          <div className="w-24 h-0.5 bg-purple-600"></div>
        </div>
  
        {/* Step 2 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex justify-center items-center">
            <span>2</span>
          </div>
          <div className="w-24 h-0.5 bg-purple-600"></div>
        </div>
  
        {/* Step 3 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border-2 border-purple-600 text-purple-600 flex justify-center items-center">
            <span>3</span>
          </div>
          <div className="w-24 h-0.5 bg-purple-300"></div>
        </div>
  
        {/* Step 4 */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border-2 border-purple-600 text-purple-600 flex justify-center items-center">
            <span>4</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  