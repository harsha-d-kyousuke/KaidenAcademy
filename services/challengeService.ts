
import { CodingChallenge } from '../types';
import { challenges } from '../data/challenges';

class ChallengeService {
  private challenges: CodingChallenge[] = [];

  constructor() {
    this.challenges = challenges;
  }

  getChallengesByLanguage(lang: CodingChallenge['language']): CodingChallenge[] {
    return this.challenges.filter(c => c.language === lang);
  }
}

export default new ChallengeService();
