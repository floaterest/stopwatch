<nav>
    <ul>
        <li class="logo">
            <span>Stopwatch</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-stopwatch" viewBox="0 0 16 16">
                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
            </svg>
        </li>
        <li>
            <a href=""><span>Information</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
            </a>
        </li>
        <li>
            <a href=""><span>⇱GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github"
                     viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
            </a>
        </li>
    </ul>
</nav>

<style lang="less">
	@trans-speed: 200ms;
	nav{
		position: fixed;
		transition: width 200ms ease;

		&:hover .logo svg{
			color: #39c5bb;
		}
	}

	ul{
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	li{
		&.logo{
			font-weight: bold;
			text-transform: uppercase;
			margin-bottom: 1rem;
			text-align: center;
			font-size: 1.5rem;
			letter-spacing: 0.3ch;
			width: 100%;

			svg{
				transition: @trans-speed;
                height: 5rem;
				span{
					display: inline;
					position: absolute;
					left: -999px;
					transition: var(--transition-speed);

				}
			}
		}

		&:not(.logo){
			width: 100%;

			&:last-child{
				margin-top: auto;
			}
		}
	}

	a{
		display: flex;
		align-items: center;
		height: 5rem;
		transition: @trans-speed;
	}

	span{
		display: none;
		margin-left: 1rem;
	}

	svg{
		width: 2rem;
		height:2rem;
		min-height:2rem;
		min-width: 2rem;
		margin: 0 1.5rem;
		transition: @trans-speed;
	}

	// large screen
	@media only screen and (min-width: 600px){
		nav{
			top: 0;
			width: 5rem;
			height: 100vh;

			&:hover{
				width: 16rem;

				span{
					display: inline;
				}

				.logo{
					svg{
						margin-left: 11rem;
					}

					span{
						left: 0;
					}
				}
			}
		}
	}
</style>
