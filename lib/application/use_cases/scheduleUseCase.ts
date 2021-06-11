import { AppContext } from '../../domain/types/appContext';
import BaseUseCase from './baseUseCase';

export default class ScheduleUseCases extends BaseUseCase {
  constructor(private appContext: AppContext) {
    super(appContext.repositories.scheduleRepository);
  }

  protected async verifyPermissions(scheduleId: string, userId: string) {}

  async cancel(scheduleId: string, userId: string) {
    // TODO: queda pendiente agregar al historial de cambios de la cita
    await this.verifyPermissions(scheduleId, userId);
    return this.appContext.repositories.scheduleRepository.update(
      { schedule_id: scheduleId },
      { cancelled_by: userId, cancelled_at: Date.now() },
    );
  }

  async reschedule(scheduleId: string, userId: string, rescheduleDate: Date) {
    // TODO: queda pendiente agregar al historial de cambios de la cita
    await this.verifyPermissions(scheduleId, userId);
    const updateOp = await this.appContext.repositories.scheduleRepository.update(
      { schedule_id: scheduleId },
      { status: 'reschedule', appointment_date: rescheduleDate },
    );
  }
}
