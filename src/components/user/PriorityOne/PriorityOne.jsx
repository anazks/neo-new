import React, { useEffect } from 'react';
import './PriorityOne.css';
import person1 from '../../../Images/persons/Ajay.png';
import person2 from '../../../Images/persons/RoneyThomas.png';
import person3 from '../../../Images/persons/Julien.png';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

function PriorityOne() {  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const team = [
    {
      name: 'Ajay Joy',
      position: 'CHIEF EXECUTIVE OFFICER',
      image: person1,
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'mailto:ajay@priorityone.com',
      },
      specialty: 'Strategic Leadership',
    },
    {
      name: 'Roney Thomas',
      position: 'CHIEF TECHNOLOGICAL OFFICER',
      image: person2,
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'mailto:roney@priorityone.com',
      },
      specialty: 'Cloud Infrastructure',
    },
    {
      name: 'Julian Prasad',
      position: 'RESEARCH & DEVELOPMENT HEAD',
      image: person3,
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'mailto:julian@priorityone.com',
      },
      specialty: 'Machine Learning',
    },
  ];

  return (
    <div className="priority-one-container">
      <div className="header" data-aos="fade-up">
        <div>
          <h1 className="title">Priority One by Neo Tokyo</h1>
          <p className="subtitle">For the One's who want the best we offer</p>
        </div>
      </div>

      <div className="team-container">
        {team.map((member, index) => (
          <div 
            className="team-member" 
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <div className="image-wrapper">
              <img 
                src={member.image} 
                alt={member.name} 
                className="person-image" 
              />
              <div className="specialty-tag">
                <span>{member.specialty}</span>
              </div>
            </div>
            <h3 className="person-name">{member.name}</h3>
            <p className="person-position">{member.position}</p>
            <div className="social-icons">
              <a 
                href={member.social.linkedin}
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href={member.social.twitter}
                className="social-icon"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href={member.social.email}
                className="social-icon"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriorityOne;