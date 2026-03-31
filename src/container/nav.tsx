import { Link } from 'react-router';
import React from 'react'
import constants from '../utils/constants';

const { routes } = constants;

const Nav = () => {
    return <div className="text-gray-700 text-xl flex flex-col gap-4">
        {
            routes.map(({ path, alias }) => {
                return <React.Fragment key={path}>
                    <Link to={path} className="text-blue-500 font-bold hover:text-yellow-500">
                        {alias}
                    </Link>
                </React.Fragment>
            })
        }
    </div>
}

export default Nav