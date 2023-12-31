import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { getAllFriends } from '../dataManager/FriendsManager';




export const FriendsList = ({ cSelected, setCSelected, onFriendClick, friends, setFriends, games }) => {

        const onCheckboxBtnClick = (selected) => {
            const index = cSelected.indexOf(selected);
            if (index < 0) {
                cSelected.push(selected);
            } else {
                cSelected.splice(index, 1);
            }
            setCSelected([...cSelected]);
            onFriendClick(selected)
        };

        const getAllTheFriends = () => {
            getAllFriends()
                .then(response => {
                    return setFriends(response)
                })
        }

        useEffect(() => {
            getAllTheFriends()
        },[])

        return (
            <div>
            
                <h5>Friends</h5>
                <ButtonGroup  vertical= {true}>
                    {friends.length >0 && friends.map((user) => 
                        <Button   
                        key={user.id}
                        color="primary"
                        outline
                        onClick={() => onCheckboxBtnClick(user.id)}
                        active={cSelected.includes(user.id)}>
                            {user.name}
                        </Button>
                    )}
                
                </ButtonGroup>
            
            </div>
        );
    }


