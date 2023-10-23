import Facebook from "../../assets/facebook-square-brands.svg";
import LinkedId from "../../assets/linkedin-brands.svg";
import Twitter from "../../assets/twitter-square-brands.svg";
import Instagram from "../../assets/instagram-square-brands.svg";
import styled from "styled-components";
import { serverTimestamp, addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const ContactSection = styled.section`
  width: 100vw;
  padding: calc(2.5rem + 2.5vw) 0;
  background-color: #0a0b10;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: var(--white);
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 3rem;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    /* or 100px */
    border-bottom: 2px solid var(--pink);
  }
`;

const Icons = styled.div`
  display: flex;
  margin-bottom: 3rem;
  a {
    &:hover {
      img {
        filter: invert(20%) sepia(100%) saturate(500%) hue-rotate(580deg)
          brightness(100%) contrast(97%);
      }
    }
    &:not(:last-child) {
      margin-right: 2rem;
    }
    img {
      width: 3rem;
      height: 3rem;
    }
  }
`;

const Container = styled.section`
  width: 50%;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column; /*Changing to row for desktop makes it look alright*/
  justify-content: center;
  input {
    flex-grow: 0;
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: var(--nav2);
    border: none;
    border-radius: 4px;
    color: #eff7f8;
    &:active,
    &:focus {
      border: none;
      outline: none;
      background-color: var(--nav);
    }
    &::placeholder {
      color: #eff7f8;
      opacity: 0.6;
    }
    &[name="name"] {
      margin-right: 2rem;
    }
    &[name="phone"] {
      margin-left: 2rem;
    }
  }
  textarea {
    padding: 1rem calc(0.5rem + 1vw);
    margin-bottom: 1rem;
    background-color: var(--nav2);
    border: none;
    border-radius: 4px;
    color: #eff7f8;
    margin-bottom: 2rem;
    &:focus,
    &:active {
      background-color: var(--nav);
    }
    &::placeholder {
      color: #eff7f8;
      opacity: 0.6;
    }
  }
  button {
    padding: 0.8rem 2rem;
    background-color: var(--white);
    border-radius: 20px;
    font-size: 1.2rem;
    color: #0a0b10;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

const Row = styled.div`
  @media only Screen and (max-width: 40em) {
    display: flex;
    flex-direction: column;
    input {
      &[name="name"] {
        margin-right: 0;
      }
      &[name="phone"] {
        margin-left: 0;
      }
    }
  }
`;
const Contact = () => {
  // Logic for the form goes here
  const [loading, setLoading] = useState(false);
  // Below is the state set to be an empty string...
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Object of the name, email, phone, and message
  const { name, email, phone, message } = formData;

  // On change function that runs a conditional if the target file is not the event driven target file which causes it to revert back to its prev state...not too sure what else it does but it seems to be an important part of the form...
  function onChange(e) {
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  }
  // Below is an async function to add client inquiries to firestore db
  async function onSubmitCONTACT(e) {
    e.preventDefault();
    setLoading(true);
    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };
    delete formDataCopy.formData;
    const docRef = await addDoc(collection(db, "contact"), formDataCopy);
    setLoading(false);
  }
  useEffect(() => {
    document.body.classList.add("page-animation");
    return () => {
      document.body.classList.remove("page-animation");
    };
  }, []);

  return (
    <ContactSection id="contact">
      <Title>Get in touch</Title>
      {/* <Text>Lorem ipsum dolor sit amet, consectetur adipisicing.</Text> */}
      <Icons>
        <a href="">
          {" "}
          <img src={Facebook} alt="Facebook" />
        </a>
        <a href="">
          <img src={LinkedId} alt="LinkedId" />
        </a>
        <a href="">
          <img src={Twitter} alt="Twitter" />
        </a>
        <a href="">
          <img src={Instagram} alt="Instagram" />
        </a>
      </Icons>
      <Container>
        <Form onSubmit={onSubmitCONTACT}>
          <Row>
            <input name="name" type="text" placeholder="Your Name" />
            <input name="email" type="email" placeholder="Working Email" />
            <input name="phone" type="phone" placeholder="(123) 456-7890" />
          </Row>
          <textarea
            name=""
            id=""
            cols="30"
            rows="2"
            placeholder="Additional Info"
          ></textarea>
          <div style={{ margin: "0 auto" }}>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Submit
            </button>
          </div>
        </Form>
      </Container>
    </ContactSection>
  );
};

export default Contact;
