import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserInfo} from '../../schemas/UserInfo';
import {DiscordService} from '../../shared/discord.service';
import {HomebrewSharingService} from '../homebrew-sharing.service';
import {Meta} from '@angular/platform-browser';
import {parseLevel, parseSchool, Spell, Tome} from '../../schemas/homebrew/Spells';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'avr-tome-share',
  templateUrl: './tome-share.component.html',
  styleUrls: ['./tome-share.component.scss']
})
export class TomeShareComponent implements OnInit {

  tome: Tome;
  owner: UserInfo;
  selectedSpell: Spell;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewSharingService, private discord: DiscordService,
              private meta: Meta) {
  }

  ngOnInit() {
    this.getTome();
  }

  updateMeta() {
    this.meta.updateTag(
      {
        name: 'description',
        content: `${this.tome.desc}\nView ${this.tome.name} on Avrae Homebrew.`.trim()
      });
    this.meta.updateTag(
      {property: 'og:title', content: this.tome.name}
    );
    this.meta.updateTag(
      {property: 'og:url', content: `${environment.baseURL}/${this.route.snapshot.url.join('/')}`}
    );
    this.meta.updateTag(
      {property: 'og:image', content: this.tome.image}
    );
    this.meta.updateTag(
      {
        property: 'og:description',
        content: `${this.tome.desc}\nView ${this.tome.name} on Avrae Homebrew.`.trim()
      });
  }

  getSpellMeta(spell) {
    return spell.level ?
      `${parseLevel(spell.level)} ${parseSchool(spell.school)}` : `${parseSchool(spell.school)} ${parseLevel(spell.level)}`;
  }

  getTome() {
    const id = this.route.snapshot.paramMap.get('tome');
    this.homebrewService.getTome(id)
      .subscribe(tome => {
        this.tome = tome;
        this.getOwner();
        this.updateMeta();
      });
  }

  getOwner() {
    this.discord.getUser(this.tome.owner)
      .subscribe(owner => this.owner = owner);
  }
}
