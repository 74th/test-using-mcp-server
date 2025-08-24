import { Task } from "../entity/task";
import * as api from "../api/task";

interface ListTaskViewProps {
    taskList: Task[];
    reloadTasks: () => Promise<void>;
}

export const ListTaskView = (props: ListTaskViewProps) => {
    const cards = props.taskList.map((task) => (
        <TaskCard
            task={task}
            reloadTasks={props.reloadTasks}
            key={task.id}
        ></TaskCard>
    ));
    return <div className="row p-2">{cards}</div>;
};

interface TaskCardProps {
    task: Task;
    reloadTasks: () => Promise<void>;
}

const TaskCard = (props: TaskCardProps) => {
    async function clickDone(): Promise<void> {
        await api.postTaskDone(props.task);
        props.reloadTasks();
    }

    const formatExpireDate = (expire?: string) => {
        if (!expire) return '';
        try {
            const date = new Date(expire);
            return date.toLocaleDateString('ja-JP');
        } catch {
            return '';
        }
    };

    const getExpireClass = (expire?: string) => {
        if (!expire) return '';
        const expireDate = new Date(expire);
        const today = new Date();
        const diffTime = expireDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'text-danger'; // 期限切れ
        if (diffDays <= 3) return 'text-warning'; // 3日以内
        return 'text-muted';
    };

    return (
        <div className="card m-2" style={{ width: "28rem" }}>
            <div className="card-body">
                <h5 className="card-title">{props.task.id}</h5>
                <p className="card-text">{props.task.text}</p>
                {props.task.expire && (
                    <p className={`card-text small ${getExpireClass(props.task.expire)}`}>
                        期限: {formatExpireDate(props.task.expire)}
                    </p>
                )}
                <button className="btn btn-primary" onClick={clickDone}>
                    done
                </button>
            </div>
        </div>
    );
};
