export enum PlayerStatus {
    IN_MAIN_MENU = 'in_main_menu',
    IN_LOBBY = 'in_lobby',
    GAMING = 'gaming',
    DIED = 'died', // TODO при смерти персонажа удалять его спрайт, чтобы не грузить рендер
}
