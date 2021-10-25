import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage";
import {CreaetePage} from "./pages/CreatePage";
import {AuthPage} from "./pages/AuthPage";
import {DetailPage} from "./pages/DetailPage";

export const useRouts = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <LinksPage/>
                </Route>
                <Route path='/create' exact>
                    <CreaetePage/>
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage/>
                </Route>
                <Redirect to='/create'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )


}