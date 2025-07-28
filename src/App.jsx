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

	useEffect(() => {
		if (expDateMonth && expDateYear) {
			setExpDate(`${expDateMonth}/${expDateYear}`);
		} else {
			setExpDate("");
		}
	}, [expDateMonth, expDateYear]);

	return (
		<div className=" relative h-screen flex flex-col md:flex-row">
			<div className="w-full h-[300px] mb-20 bg-[url('/images/bg-main-mobile.png')] bg-cover bg-no-repeat sm:w-full sm:h-[350px] md:bg-[url('/images/bg-main-desktop.png')] md:w-[30%] md:h-full">
				<Card
					cardHolder={cardHolder}
					cardNumber={cardNumber}
					expDate={expDate}
					cvc={cvc}
				/>
			</div>

			<div className="w-full h-[300px] sm:h-[400px] md:h-full md:w-[70%]">
				<Form
					setCardHolder={setCardHolder}
					setCardNumber={setCardNumber}
					setExpDate={setExpDate}
					setCvc={setCvc}
					setExpDateMonth={setExpDateMonth}
					setExpDateYear={setExpDateYear}
				/>
			</div>
		</div>
	);
}

function Card({ cardHolder, cardNumber, expDate, cvc }) {
	return (
		<>
			<div className="w-[70%] absolute top-20 left-25 h-[100px] flex items-center justify-center">
				<div className="relative">
					<img src="./images/bg-card-back.png" alt="card-back" />
					<div className="absolute top-18 left-59 text-white text-sm">
						<input
							type="text"
							placeholder="000"
							value={cvc}
							className="w-full bg-transparent border-none placeholder:gray-300 focus:outline-none focus:ring-0"
							disabled
						/>
					</div>
				</div>
			</div>
			<div className="absolute top-35 left-8 w-[70%] flex items-center justify-center">
				<div className="relative">
					<img src="./images/bg-card-front.png" alt="card-front" />

					<div className="absolute top-6 left-6 w-[100px] h-[50px]">
						<img src="./images/card-logo.svg" alt="card-logo" className="h-8" />
					</div>
					<div className="absolute bottom-13 w-full left-0 right-0 text-white text-lg ">
						<input
							type="text"
							placeholder="0000 0000 0000 0000"
							value={cardNumber}
							className="w-full 
								text-center tracking-widest bg-transparent border-none text-white placeholder:gray-300 focus:outline-none focus:ring-0"
							disabled
						/>
					</div>
					<div className="absolute bottom-6 left-6 text-white text-sm">
						<input
							type="text"
							placeholder="JANE APPLESSED"
							className="w-full bg-transparent border-none placeholder:gray-300 focus:outline-none focus:ring-0"
							value={cardHolder}
							disabled
							onChange={() => {}}
						/>
					</div>
					<div className="absolute bottom-6 left-56 text-white text-sm">
						<input
							type="text"
							placeholder="00/00"
							className="w-full bg-transparent border-none placeholder:gray-300 focus:outline-none focus:ring-0"
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
}) {
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

	const maxLength = 2; // Maximum length for month and year inputs

	return (
		<div className="flex flex-col items-center justify-center h-[300px] sm:h-[400px] md:h-full pt-4 sm:pt-6 md:pt-0">
			<form className="w-full max-w-sm ">
				<label htmlFor="CARDHOLDER NAME">
					<span className="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
						CARDHOLDER NAME
					</span>
					<input
						type="text"
						id="CARDHOLDER NAME"
						className="w-full border rounded-md border-gray-300 p-2 mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)]"
						placeholder="e.g. Jane Applessed"
						onChange={(e) => setCardHolder(e.target.value)}
						required
					/>
				</label>
				<label htmlFor="CARD NUMBER">
					<span className="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
						CARD NUMBER
					</span>
					<input
						type="text"
						id="CARD NUMBER"
						className="w-full border rounded-md border-gray-300 p-2 mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)]"
						placeholder="e.g. 1234 5678 9123 0000"
						onChange={handleCardNumberChange}
						maxLength="16"
						required
					/>
				</label>
				<div class="flex flex-wrap gap-4 w-full">
					{/* EXP. DATE */}
					<div>
						<label class="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
							EXP. DATE (MM/YY)
						</label>
						<div class="flex gap-2">
							<input
								type="text"
								placeholder="MM"
								className="w-20 px-2 py-2 border rounded-md border-gray-300 p-2 mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)]"
								onChange={handleExpDateMonthChange}
								maxLength={maxLength}
								min={1}
								max={12}
								pattern="\d{2}"
								title="Please enter a valid expiration date in the format MM"
								required
							/>
							<input
								type="text"
								placeholder="YY"
								class="w-20 px-2 py-2 border rounded-md border-gray-300 p-2 mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)] "
								onChange={(e) => setExpDateYear(e.target.value)}
								maxLength="2"
								pattern="\d{2}"
								title="Please enter a valid expiration date in the format YY"
								required
							/>
						</div>
					</div>

					{/* CVC */}
					<div>
						<label class="block text-[14px] text-[hsl(278,68%,24%)] mb-2">
							CVC
						</label>
						<input
							type="text"
							placeholder="e.g. 123"
							class="w-50 sm:w-25 px-2 py-2 border rounded-md border-gray-300 p-2 mb-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[hsl(264,97%,47%)]"
							maxLength="3"
							pattern="\d{3}"
							title="Please enter a valid CVC in the format 123"
							onChange={(e) => setCvc(e.target.value)}
							required
						/>
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
