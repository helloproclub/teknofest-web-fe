export const restructureYupValidationState = (validation) => {
    const rawValidationData = validation.inner.map(({ path, errors }) => ({ path, errors }));
    return rawValidationData.reduce((o, cur) => {
        let prev = o;
        const occurs = prev.reduce((n, item, i) => ((item.path === cur.path) ? i : n), -1);

        if (occurs >= 0) {
            prev[occurs].errors = prev[occurs].errors.concat([...cur.errors]);
        } else {
            const obj = {
                path: cur.path,
                errors: [...cur.errors],
            };
            prev = prev.concat([obj]);
        }

        return prev;
    }, []);
};
