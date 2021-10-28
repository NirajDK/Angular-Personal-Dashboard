import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { group } from '@angular/animations';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators'

const baseStyles =  style({
  //display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
         baseStyles
        ],{ optional:true }),

        // query(':enter', [
        //   style({ opacity:0 })
        // ], { optional:true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ],{ optional:true }),
  
          query(':enter',[
            style({
              opacity: 0,
              transform: 'translateX(50px)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional:true })
        ])
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          //overflow: 'hidden'
        }),

        query(':enter, :leave', [
         baseStyles
        ],{ optional:true }),

        // query(':enter', [
        //   style({ opacity:0 })
        // ], { optional:true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ],{ optional:true }),
  
          query(':enter',[
            style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional:true })
        ])
      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
         baseStyles
        ],{ optional:true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ],{ optional:true }),
  
          query(':enter',[
            style({
              opacity: 0,
              transform: 'scale(1.2)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional:true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
         baseStyles
        ],{ optional:true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ],{ optional:true }),
  
          query(':enter',[
            style({
              opacity: 0,
              transform: 'scale(0.8)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional:true })
        ])
      ])

    ]),

    trigger('bgAnim', [
      transition(':leave', animate(1000, style({
          opacity: 0
        })))
    ]),

    trigger ('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity:1
        }))
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])

  ]
})
export class AppComponent implements OnInit{
  
  backgrounds: string[] = [
    'https://images.unsplash.com/photo-1633531138911-1dffbaa8d65d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNTI0MzY2Nw&ixlib=rb-1.2.1&q=80&w=1920'
  ]

  loadingBGImage!: boolean

  dateTime!: Observable<Date>

  ngOnInit() {

    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  prepareRoute(outlet: RouterOutlet) {

    if (outlet.isActivated) {
      const tab =  outlet.activatedRouteData['tab']
      if (!tab) return 'secondary'
      return tab
    }

  }

  async changeBGImage():Promise<any> {
    this.loadingBGImage = true

    const result = await fetch('https://source.unsplash.com/random/1366x768', {
      method: 'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(result.url)
    if(alreadyGot) {
      //this is the same image as we currently have, so re-run the function
      return this.changeBGImage()
    }

    this.backgrounds.push(result.url)
  }

  onBGImageLoad(imgEvent: Event) {
    //BG Image has loaded so now remove the old bg image from the background array
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)

    this.loadingBGImage = false
  }

}
