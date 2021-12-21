/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Sidebar.css";
import { useState } from "react";
import logo from "../../common/logo.svg";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useLogout } from "../../common/hooks/useLogout";
import NewDeckModal from "./NewDeckModal";
import DeckLink from "./DeckLink";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const logout = useLogout();
  const GET_DECKS = gql`
    query getUserDecks {
      user {
        decks {
          id
          name
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_DECKS);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={isOpen ? "sidebar" : "sidebar collapsed"}>
      <NewDeckModal open={showModal} setOpen={setShowModal} />
      <div>
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={logo} className="logo" alt="logo" />
        </Link>
        <Link className="icon-link" to="/" onClick={() => setIsOpen(false)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <p>Dashboard</p>
        </Link>
        <Link className="icon-link" to="/due" onClick={() => setIsOpen(false)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p>Due today</p>
        </Link>
        <Link className="icon-link" to="/new" onClick={() => setIsOpen(false)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <p>Learn new</p>
        </Link>
        <br></br>
        <div className="decks">
          <strong className="link new-deck">
            <strong>Decks</strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="new-deck-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setShowModal(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </strong>
          {loading ? (
            <p>Loading decks...</p>
          ) : error ? (
            <p>Couldn't load decks :(</p>
          ) : (
            data.user.decks.map((deck) => (
              <span key={deck.id} onClick={() => setIsOpen(false)}>
                <DeckLink id={deck.id} name={deck.name} />
              </span>
            ))
          )}
        </div>
      </div>
      <a className="link" onClick={logout}>
        log out
      </a>
    </div>
  );
};

export default Sidebar;
