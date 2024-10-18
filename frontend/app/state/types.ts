interface LoaderState {
    loading: boolean;
}

// USER TYPES
interface RegisterProps {
    username: string,
    email: string,
    password: string
}

interface LoginPayload {
    email: string,
    password: string
}

type UserState = {
    profile: {
        username: string;
        email: string;
        updatedAt: string;
        createdAt: string;
        deletedAt: null | string;
        uuid: string;
    } | null,
    token: string | null
}

type AlertState = {
    status: "SUCCESS" | "ERROR" | null,
    message: string | null
    title: string | null
    loading: boolean,
    timeoutId: NodeJS.Timeout | null;

}
type AlertProps = {
    message: string | null
    title: string | null
    status: "SUCCESS" | "ERROR" | null
    closeModal: () => void | null
}

// Title 

type TitleState = {
    titles: {
        title: string;
        subject: string;
        userId: {
            createdAt: string | Date;
            updatedAt: string;
            deletedAt: null;
            uuid: string;
            username: string;
            email: string;
            password: string;
        };
        updatedAt: string;
        createdAt: Date;
        deletedAt: null;
        uuid: string;
    }[]
}
type SingleTitleState = {
    title: string;
    subject: string;
    userId: {
        createdAt: string | Date;
        updatedAt: string;
        deletedAt: null;
        uuid: string;
        username: string;
        email: string;
        password: string;
    };
    updatedAt: string;
    createdAt: Date;
    deletedAt: null;
    uuid: string;
}

type createTitleProps = {
    title: string,
    subject: string
}