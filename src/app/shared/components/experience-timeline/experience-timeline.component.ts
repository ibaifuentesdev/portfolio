import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExperienceItem } from '../../models';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './experience-timeline.component.html',
  styleUrl: './experience-timeline.component.scss'
})
export class ExperienceTimelineComponent {
  @Input() maxItems: number = 3;
  
  protected recentExperiences: readonly ExperienceItem[] = [];

  constructor(private readonly experienceService: ExperienceService) {
    this.recentExperiences = this.experienceService.getRecentExperiences(this.maxItems);
  }

  protected formatDate(period: string): string {
    // Extraer y formatear el período para mostrar solo el año y mes
    return period;
  }

  protected getCompanyInitials(company: string): string {
    return company
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  protected getPeriodShort(period: string): string {
    // Convertir "ene. 2025 - actualidad" a "2025 - Actual"
    return period
      .replace('ene.', 'Ene')
      .replace('feb.', 'Feb')
      .replace('mar.', 'Mar')
      .replace('abr.', 'Abr')
      .replace('may.', 'May')
      .replace('jun.', 'Jun')
      .replace('jul.', 'Jul')
      .replace('ago.', 'Ago')
      .replace('sep.', 'Sep')
      .replace('oct.', 'Oct')
      .replace('nov.', 'Nov')
      .replace('dic.', 'Dic')
      .replace('actualidad', 'Actual');
  }
}
