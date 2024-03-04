import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Dashboard | RhythmReserve';
    }, []);

    const handleLogout = () => {
        logout(); // update 
        navigate('/login'); // redirect to login page afterwards
    };

    return (
        <div className="home-page text-white fw-bold">
            <div className="dashboard">
                <h1>Welcome your dashboard!</h1>
                <p>You are now logged in! See venues below!</p>
                <button onClick={handleLogout} className="btn btn-primary position-absolute top-0 end-0 mt-3 me-3">Logout</button>

                {/* Grid of cards */}
                <div className="row mt-5">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card">
                                <img src="https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1682714955/brooksschoolorg/aucb7xbkp18dwu78z7mw/cabaret23-thumb.jpg" className="card-img-top" alt="Placeholder" />
                                <div className="card-body">
                                    <h5 className="card-title">Venue</h5>
                                    <p className="card-text">Click to see concerts</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;