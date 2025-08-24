import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Task } from "../entity/task";
import * as api from "../api/task";

interface Props {
    reloadTasks: () => Promise<void>;
}

export const NewTaskForm = (props: Props) => {
    const { register, handleSubmit, reset, control } = useForm<Task>();

    const onSubmit = async (task: Task) => {
        console.log(task);
        await api.postTask(task);
        reset();
        await props.reloadTasks();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-4">
                    <div className="my-3">
                        <h4>Task Title</h4>
                        <input
                            {...register("text")}
                            type="text"
                            className="form-control"
                            placeholder="task contents"
                        />
                    </div>
                    <div className="my-3">
                        <h4>期限日</h4>
                        <Controller
                            name="expire"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value ? new Date(field.value) : null}
                                    onChange={(date) => {
                                        field.onChange(date ? date.toISOString().split('T')[0] : '');
                                    }}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control"
                                    placeholderText="期限日を選択してください"
                                    isClearable
                                />
                            )}
                        />
                    </div>
                    <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                    >
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};
