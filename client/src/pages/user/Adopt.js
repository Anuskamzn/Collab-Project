import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';

const Adopt = () => {
    return (
        <Layout>
            <div className="container-flui p-3 m-3">
                <div className='row'>
                    <div className='col-md-3'>
                    <UserMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Adopt</h1>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default Adopt; 