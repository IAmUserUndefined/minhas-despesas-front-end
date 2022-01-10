import { useState } from "react";

const useModal = () => {
  const [message, setMessage] = useState("")
  const [display, setDisplay] = useState("none")

  const handleShowModal = (message) => {
    setMessage(message)
    setDisplay("flex")
  }

  const handleCloseModal = (e) => {
    if (e.target.id !== "modal" && e.target.id !== "message") {
      setDisplay("none");
    }
  }

  return { message, display, handleShowModal, handleCloseModal }
}

export default useModal;