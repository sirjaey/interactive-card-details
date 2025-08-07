import { useState } from "react";

function Form({
	setCardHolder,
	setCardNumber,
	setExpDate,
	setExpDateMonth,
	setExpDateYear,
	setCvc,
	isSubmitted,
	setIsSubmitted,
}) {
	const [isCardHolder, setIsCardHolder] = useState(true);
	const [isCardNumber, setIsCardNumber] = useState(true);
	const [isExpDateMonth, setIsExpDateMonth] = useState(true);
	const [isExpDateYear, setIsExpDateYear] = useState(true);
	const [isCvc, setIsCvc] = useState(true);

	const formatCardNumber = (value) => {
		// Remove all non-digit characters
		const digitsOnly = value.replace(/\D/g, "");
		// Group digits in chunks of 4 and join with space
		return digitsOnly.match(/.{1,4}/g)?.join(" ") || "";
	};

	const handleCardNumberChange = (e) => {
		const input = e.target.value;
		const formatted = formatCardNumber(input);
		setCardNumber(formatted);
	};

	function handleExpDateMonthChange(e) {
		let value = e.target.value;
		value = value.replace(/\D/g, "");
		if (parseInt(value) > 12) {
			value = "12";
		}
		setExpDateMonth(value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		// Validate the form fields
		const cardHolder = e.target["CARDHOLDER-NAME"].value.trim();
		const cardNumber = e.target["CARD-NUMBER"].value.replace(/\s/g, "").trim();
		const expDateMonth = e.target["MM"].value.trim();
		const expDateYear = e.target["YY"].value.trim();
		const cvc = e.target["CVC"].value.trim();

		const isCard = cardHolder.length > 0;
		setIsCardHolder(isCard);
		const isCardNum = cardNumber.length === 16;
		setIsCardNumber(isCardNum);
		const isExpMonth =
			expDateMonth.length === 2 &&
			parseInt(expDateMonth) >= 1 &&
			parseInt(expDateMonth) <= 12;
		setIsExpDateMonth(isExpMonth);
		const isExpYear = expDateYear.length === 2;
		setIsExpDateYear(isExpYear);
		const isCvcValid = cvc.length === 3;
		setIsCvc(isCvcValid);

		if (isCard && isCardNum && isExpMonth && isExpYear && isCvcValid) {
			setIsSubmitted(!isSubmitted);
			setCardHolder("");
			setCardNumber("");
			setExpDateMonth("");
			setExpDateYear("");
			setCvc("");
			setExpDate("");
		} else {
			return;
		}
	}

	const maxLength = 2; // Maximum length for month and year inputs

	return (
		<div className="flex flex-col items-center justify-center h-[300px] px-0 sm:h-[400px] w-full md:h-full pt-0  sm:pt-6 md:pt-0">
			<form
				className={`w-full max-w-full  sm:max-w-sm px-4 sm:px-8 bg-white rounded-lg`}
				onSubmit={handleSubmit}>
				<label htmlFor="CARDHOLDER NAME">
					<span className="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
						CARDHOLDER NAME
					</span>
					<input
						type="text"
						id="CARDHOLDER-NAME"
						className={`w-full border rounded-md border-gray-300 p-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)] ${
							isCardHolder ? "mb-4" : "border-red-500 mb-0"
						}`}
						placeholder="e.g. Jane Applessed"
						onChange={(e) => setCardHolder(e.target.value)}
						maxLength="30"
						pattern="^[a-zA-Z\s]+$"
						title="Please enter a valid cardholder name (letters and spaces only)"
					/>
					<p
						className={`error text-red-500 pt-0 mt-0 mb-4 text-[12px] ${
							isCardHolder ? "hidden" : "flex"
						}`}>
						Cannot be blank
					</p>
				</label>
				<label htmlFor="CARD NUMBER">
					<span className="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
						CARD NUMBER
					</span>
					<input
						type="text"
						id="CARD-NUMBER"
						className={`w-full border rounded-md border-gray-300 p-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)] ${
							isCardNumber ? "mb-4" : "border-red-500 mb-0"
						}`}
						placeholder="e.g. 1234 5678 9123 0000"
						onChange={handleCardNumberChange}
						maxLength="16"
					/>
					<p
						className={`error text-red-500 pt-0 mt-0 mb-4 text-[12px] ${
							isCardNumber ? "hidden" : "flex"
						}`}>
						Card number cannot be less than 16 digits
					</p>
				</label>
				<div className="flex  gap-4 w-full">
					{/* EXP. DATE */}
					<div className="w-[50%] ">
						<label className="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
							EXP. DATE (MM/YY)
						</label>
						<div className="flex gap-2">
							<div>
								<input
									type="text"
									placeholder="MM"
									id="MM"
									className={`w-full max-w-[100px] px-2 py-2 border rounded-md  border-gray-300 p-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)] ${
										isExpDateMonth ? "mb-4" : "border-red-500 mb-0"
									}`}
									onChange={handleExpDateMonthChange}
									maxLength={maxLength}
									min={1}
									max={12}
									pattern="\d{2}"
									title="Please enter a valid expiration date in the format MM"
								/>
								<p
									className={`error text-red-500 pt-0 mt-0 mb-4 text-[12px] ${
										isExpDateMonth ? "hidden" : "flex"
									}`}>
									Cannot be blank
								</p>
							</div>
							<div>
								<input
									type="text"
									placeholder="YY"
									id="YY"
									className={`w-full max-w-[100px] px-2 py-2 border rounded-md  border-gray-300 p-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)] ${
										isExpDateYear ? "mb-4" : "border-red-500 mb-0"
									}`}
									onChange={(e) => setExpDateYear(e.target.value)}
									maxLength="2"
									pattern="\d{2}"
									title="Please enter a valid expiration date in the format YY"
								/>
								<p
									className={`error text-red-500 pt-0 mt-0 mb-4 text-[12px] ${
										isExpDateYear ? "hidden" : "flex"
									}`}>
									Cannot be blank
								</p>
							</div>
						</div>
					</div>

					{/* CVC */}
					<div className="w-[50%]">
						<label className="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
							CVC
						</label>
						<input
							type="text"
							placeholder="e.g. 123"
							id="CVC"
							className={`w-full px-2 py-2 border rounded-md border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)] ${
								isCvc ? "mb-4" : "border-red-500 mb-0"
							}`}
							maxLength="3"
							pattern="\d{3}"
							title="Please enter a valid CVC in the format 123"
							onChange={(e) => setCvc(e.target.value)}
						/>
						<p
							className={`error text-red-500 pt-0 mt-0 mb-4 text-[12px] ${
								isCvc ? "hidden" : "flex"
							}`}>
							CVC must be 3 digits
						</p>
					</div>
				</div>

				<button
					type="submit"
					className="bg-[hsl(278,68%,11%)] text-white p-2 w-full border-none rounded-md hover:bg-[hsl(278,68%,24%)] cursor-pointer focus:ring-[hsl(264,97%,47%)]">
					Confirm
				</button>
			</form>
		</div>
	);
}

export default Form;