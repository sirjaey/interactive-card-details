import { useEffect, useState } from "react";

export default function App() {
	return (
		<>
			<Main />
		</>
	);
}

function Main() {
	const [cardNumber, setCardNumber] = useState("");
	const [cardHolder, setCardHolder] = useState("");
	const [expDate, setExpDate] = useState("");
	const [expDateMonth, setExpDateMonth] = useState("");
	const [expDateYear, setExpDateYear] = useState("");
	const [cvc, setCvc] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false)

	useEffect(() => {
		if (expDateMonth && expDateYear) {
			setExpDate(`${expDateMonth}/${expDateYear}`);
		} else {
			setExpDate("");
		}
	}, [expDateMonth, expDateYear]);

	return (
		<div className=" relative h-screen flex flex-col md:flex-row">
			<div className="w-full relative h-[200px] mb-20 bg-[url('/images/bg-main-mobile.png')] bg-cover bg-no-repeat sm:w-full sm:h-[350px] md:bg-[url('/images/bg-main-desktop.png')] md:w-[30%] md:h-full">
				<Card
					cardHolder={cardHolder}
					cardNumber={cardNumber}
					expDate={expDate}
					cvc={cvc}
				/>
			</div>

			<div className="w-full sm:h-[400px] md:h-full md:w-[70%]">
				{!isSubmitted ? (
					<Form
						setCardHolder={setCardHolder}
						setCardNumber={setCardNumber}
						setExpDate={setExpDate}
						setCvc={setCvc}
						setExpDateMonth={setExpDateMonth}
						setExpDateYear={setExpDateYear}
						isSubmitted={isSubmitted}
						setIsSubmitted={setIsSubmitted}
					/>
				) : (
					<Completed
						isSubmitted={isSubmitted}
						setIsSubmitted={setIsSubmitted}
					/>
				)}
			</div>
		</div>
	);
}

function Card({ cardHolder, cardNumber, expDate, cvc }) {
	return (
		<>
			<div className="w-[70%] md:w-full absolute top-10 md:top-115 left-25 md:left-55 h-[100px] flex items-center justify-center">
				<div className="relative">
					<img
						src="./images/bg-card-back.png"
						alt="card-back"
						className="w-[300px] h-[150px] md:w-full md:h-full"
					/>
					<div className="absolute top-16 left-50 md:top-28 md:left-90 text-white text-sm">
						<input
							type="text"
							placeholder="000"
							value={cvc}
							className="w-full bg-transparent text-[12px] border-none placeholder:gray-300 focus:outline-none focus:ring-0"
							disabled
						/>
					</div>
				</div>
			</div>
			<div className="absolute top-25 right-6 md:left-35 w-full md:w-full flex items-center justify-center">
				<div className="relative">
					<img
						src="./images/bg-card-front.png"
						alt="card-front"
						className="w-[300px] h-[150px] md:w-full md:h-full"
					/>

					<div className="absolute top-5 left-5 w-[100px] h-[50px] ">
						<img
							src="./images/card-logo.svg"
							alt="card-logo"
							className="h-6 md:h-10"
						/>
					</div>
					<div className="absolute bottom-13 md:bottom-20 w-full left-0 right-0  text-white text-lg ">
						<input
							type="text"
							placeholder="0000 0000 0000 0000"
							value={cardNumber}
							className="w-full 
								md:text-[20px] md:text-left md:w-full md:tracking-[0.4em] px-6 md:px-6 tracking-[0.15em] bg-transparent border-none text-white placeholder:gray-300 focus:outline-none focus:ring-0"
							disabled
						/>
					</div>

					<div className="absolute bottom-5 left-6 text-white text-sm">
						<input
							type="text"
							placeholder="SIRJAEY ISKING"
							className="w-full bg-transparent text-[12px] md:text-[14px] border-none placeholder:gray-300 focus:outline-none focus:ring-0"
							value={cardHolder}
							disabled
							onChange={() => {}}
						/>
					</div>
					<div className="absolute bottom-5 left-60 md:left-90 text-white text-sm">
						<input
							type="text"
							placeholder="00/00"
							className="w-full text-[12px] md:text-[14px] bg-transparent border-none placeholder:gray-300 focus:outline-none focus:ring-0"
							value={expDate}
							disabled
							onChange={() => {}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

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
							className={`w-full px-2 py-2 border rounded-md border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)] ${isCvc ? "mb-4" : "border-red-500 mb-0"}`}
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
