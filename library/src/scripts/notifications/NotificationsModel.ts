/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import ReduxReducer from "@library/state/ReduxReducer";
import produce from "immer";
import { ILoadable, LoadStatus, INotification } from "@library/@types/api";
import NotificationsActions from "@library/notifications/NotificationsActions";

interface INotificationsState {
    notificationsByID: ILoadable<{ [key: number]: INotification }>;
}

export interface INotificationsStoreState {
    notifications: INotificationsState;
}

export interface IWithNotifications extends INotificationsState {}

/**
 * Manage notification state in Redux.
 */
export default class NotificationsModel implements ReduxReducer<INotificationsState> {
    public readonly initialState: INotificationsState = {
        notificationsByID: {
            data: {},
            status: LoadStatus.PENDING,
        },
    };

    /**
     * Update the notifications state, based on the dispatched action.
     *
     * @param state Previous state of the store.
     * @param action Name for the type of action that was dispatched.
     */
    public reducer = (
        state: INotificationsState = this.initialState,
        action: typeof NotificationsActions.ACTION_TYPES,
    ): INotificationsState => {
        return produce(state, nextState => {
            switch (action.type) {
                case NotificationsActions.GET_NOTIFICATIONS_REQUEST:
                    nextState.notificationsByID.status = LoadStatus.LOADING;
                    break;
                case NotificationsActions.GET_NOTIFICATIONS_RESPONSE:
                    nextState.notificationsByID.status = LoadStatus.SUCCESS;
                    nextState.notificationsByID.data = {};
                    const notifications = action.payload.data as INotification[];
                    notifications.forEach(notification => {
                        nextState.notificationsByID.data![notification.notificationID] = notification;
                    });
                    break;
                case NotificationsActions.GET_NOTIFICATIONS_ERROR:
                    nextState.notificationsByID.status = LoadStatus.ERROR;
                    nextState.notificationsByID.error = action.payload;
                    break;
            }
        });
    };
}
