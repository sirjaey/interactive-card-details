function Completed({ isSubmitted, setIsSubmitted }) {
	function hadleContinue() {
		// Reset the form or navigate to another page
		setIsSubmitted(!isSubmitted);
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<img
				src="./images/icon-complete.svg"
				alt="icon-complete"
				className="w-16 h-16 mb-4"
			/>
			<h1 className="text-[hsl(278,68%,24%)] text-2xl font-bold mb-2">
				THANK YOU!
			</h1>
			<p className="text-gray-600 text-center">We've added your card details</p>
			<button
				className="mt-6 bg-[hsl(278,68%,11%)] text-white cursor-pointer p-2 w-full max-w-xs rounded-md hover:bg-purple-700"
				onClick={hadleContinue}>
				Continue
			</button>
		</div>
	);
}
export default Completed;