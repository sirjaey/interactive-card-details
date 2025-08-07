import { useState, useEffect } from "react";
import Card from "./Card";
import Form from "./Form";
import Completed from "./Completed";


function Main() {
	const [cardNumber, setCardNumber] = useState("");
	const [cardHolder, setCardHolder] = useState("");
	const [expDate, setExpDate] = useState("");
	const [expDateMonth, setExpDateMonth] = useState("");
	const [expDateYear, setExpDateYear] = useState("");
	const [cvc, setCvc] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

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

export default Main;