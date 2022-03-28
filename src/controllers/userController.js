import AppError from '../errors/appError';
import { catchAsync } from '../errors/errorController';
import user from '../models/user';

export const create = catchAsync(async (req, res, next) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    const result = await user.insert(userData);

    if (!result.ok) return next(new AppError(result.message, 400));

    res.status(200).json({
        ok: true,
        status: result.message,
    });
});

export const getById = catchAsync(async (req, res, next) => {
    const id = Number(req.params.userId);
    const result = await user.select({ id });

    if (result.length === 0)
        return next(new AppError('No results found for the given id.', 404));

    res.status(200).json({
        ok: true,
        results: result.rows,
    });
});
