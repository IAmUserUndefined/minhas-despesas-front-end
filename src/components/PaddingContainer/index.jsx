import React from 'react';

const PaddingContainer = ({ children }) => {
    return ( 
        <>
            <main style={{ padding: ".9rem" }}>
                { children }
            </main>
        </>
     );
}
 
export default PaddingContainer;